/* =====================================================
   SONG LIST
===================================================== */

const songs = [
  "01_ganesh-vandana.mp4",
  "02_presentation-class-1-3.mp4",
  "03_ashtaavtaar.mp4",
  "04_krishna-janm.mp4",
  "05_brahmand-darshan.mp4",
  "06_dahi-handi.mp4",
  "07_akroor-yashoda.mp4",
  "08_radha-krishna.mp4",
  "09_kubja.mp4",
  "10_kans-krishna.mp4",
  "11_balram-krishna.mp4",
  "12_sudama.mp4",
  "13_shishupal.mp4",
  "14_krishna-draupadi.mp4",
  "15_shakuni-duryodhan.mp4",
  "16_cheer-haran.mp4",
  "17_shanti-doot.mp4",
  "18_geeta-updesh.mp4",
  "19_gandhari-shraap.mp4",
  "20_dwarka-vileen.mp4",
  "21_krishna-bhakt.mp4",
  "22_buddh-kalki.mp4",
  "23_krishna-manch-hagman.mp4",
  "24_madhurashtak.mp4"
];

/* =====================================================
   ELEMENTS
===================================================== */

const audio =
    document.getElementById("audio");

const songTitle =
    document.getElementById("songTitle");

const songNumber =
    document.getElementById("songNumber");

const playBtn =
    document.getElementById("playBtn");

const playIcon =
    document.getElementById("playIcon");

const previousBtn =
    document.getElementById("previousBtn");

const nextBtn =
    document.getElementById("nextBtn");

const backBtn =
    document.getElementById("backBtn");

const forwardBtn =
    document.getElementById("forwardBtn");

const progressTrack =
    document.getElementById("progressTrack");

const progressBar =
    document.getElementById("progressBar");

const progressThumb =
    document.getElementById("progressThumb");

const currentTime =
    document.getElementById("currentTime");

const duration =
    document.getElementById("duration");

const playlist =
    document.getElementById("playlist");

const songCount =
    document.getElementById("songCount");

const search =
    document.getElementById("search");

const repeatBtn =
    document.getElementById("repeatBtn");

const shuffleBtn =
    document.getElementById("shuffleBtn");

const speed =
    document.getElementById("speed");

const volume =
    document.getElementById("volume");

const muteBtn =
    document.getElementById("muteBtn");

const volumeIcon =
    document.getElementById("volumeIcon");


/* =====================================================
   AUDIO LEVEL METER ELEMENTS
===================================================== */

const leftLevel =
    document.getElementById("leftLevel");

const rightLevel =
    document.getElementById("rightLevel");

const leftPeak =
    document.getElementById("leftPeak");

const rightPeak =
    document.getElementById("rightPeak");

const leftDb =
    document.getElementById("leftDb");

const rightDb =
    document.getElementById("rightDb");

const clippingIndicator =
    document.getElementById("clippingIndicator");


/* =====================================================
   STATE
===================================================== */

let currentSong = 0;

let repeat = false;

let shuffle = false;

let isDragging = false;

let previousVolume = 1;


/* =====================================================
   WEB AUDIO API STATE
===================================================== */

let audioContext = null;

let mediaSource = null;

let channelSplitter = null;

let leftAnalyser = null;

let rightAnalyser = null;

let leftData = null;

let rightData = null;

let audioGraphReady = false;


/* =====================================================
   METER STATE
===================================================== */

let leftPeakValue = -60;

let rightPeakValue = -60;

let leftPeakTime = 0;

let rightPeakTime = 0;

let clippingUntil = 0;


/*
   Peak hold time before it starts falling.
*/
const PEAK_HOLD_TIME = 1500;


/*
   Peak fall speed in dB per frame.
*/
const PEAK_FALL_SPEED = 0.35;


/*
   Clipping indicator remains visible
   briefly after clipping is detected.
*/
const CLIPPING_HOLD_TIME = 250;


/* =====================================================
   PLAY ICONS
===================================================== */

const PLAY_ICON = `
    <polygon
        points="8,5 19,12 8,19"
        fill="currentColor"
        stroke="none"
    />
`;

const PAUSE_ICON = `
    <rect
        x="7"
        y="5"
        width="4"
        height="14"
        rx="1"
        fill="currentColor"
        stroke="none"
    />

    <rect
        x="13"
        y="5"
        width="4"
        height="14"
        rx="1"
        fill="currentColor"
        stroke="none"
    />
`;


/* =====================================================
   VOLUME ICONS
===================================================== */

const VOLUME_ICON = `
    <polygon
        points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"
        fill="currentColor"
        stroke="none"
    />

    <path d="M15 9a4 4 0 0 1 0 6"/>

    <path d="M18 6a8 8 0 0 1 0 12"/>
`;

const MUTE_ICON = `
    <polygon
        points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"
        fill="currentColor"
        stroke="none"
    />

    <line
        x1="16"
        y1="9"
        x2="21"
        y2="15"
    />

    <line
        x1="21"
        y1="9"
        x2="16"
        y2="15"
    />
`;


/* =====================================================
   WEB AUDIO INITIALIZATION
===================================================== */

function initializeAudioAnalyzer() {

    if (audioGraphReady) {

        if (
            audioContext &&
            audioContext.state === "suspended"
        ) {

            audioContext.resume();

        }

        return;

    }


    const AudioContext =
        window.AudioContext ||
        window.webkitAudioContext;


    if (!AudioContext) {

        console.warn(
            "Web Audio API is not supported by this browser."
        );

        return;

    }


    try {

        audioContext =
            new AudioContext();


        /*
         * IMPORTANT:
         *
         * The MediaElementSource is created only once.
         * Creating another one for the same <audio>
         * element can break audio playback.
         */

        mediaSource =
            audioContext.createMediaElementSource(
                audio
            );


        channelSplitter =
            audioContext.createChannelSplitter(2);


        leftAnalyser =
            audioContext.createAnalyser();

        rightAnalyser =
            audioContext.createAnalyser();


        /*
         * 2048 samples gives us a good balance
         * between responsiveness and stability.
         */

        leftAnalyser.fftSize = 2048;

        rightAnalyser.fftSize = 2048;


        leftAnalyser.smoothingTimeConstant = 0.08;

        rightAnalyser.smoothingTimeConstant = 0.08;


        /*
         * Float32 data gives us actual normalized
         * audio sample values.
         *
         * 1.0  = 0 dBFS
         * 0.5  = approximately -6 dBFS
         * 0.1  = approximately -20 dBFS
         */

        leftData =
            new Float32Array(
                leftAnalyser.fftSize
            );

        rightData =
            new Float32Array(
                rightAnalyser.fftSize
            );


        /*
         * AUDIO ROUTING
         *
         * Audio Element
         *       ↓
         * MediaElementSource
         *       ↓
         * Channel Splitter
         *      ↙   ↘
         *     L     R
         *     ↓     ↓
         * Analyzer Analyzer
         *
         * The original signal is also sent
         * directly to the speakers.
         */

        mediaSource.connect(
            channelSplitter
        );


        channelSplitter.connect(
            leftAnalyser,
            0
        );


        channelSplitter.connect(
            rightAnalyser,
            1
        );


        /*
         * Keep normal audio playback working.
         */

        mediaSource.connect(
            audioContext.destination
        );


        audioGraphReady = true;


        /*
         * Start the meter loop.
         */

        requestAnimationFrame(
            updateAudioMeters
        );

    }

    catch (error) {

        console.error(
            "Audio analyzer initialization failed:",
            error
        );

    }

}


/* =====================================================
   RESUME AUDIO CONTEXT
===================================================== */

function resumeAudioContext() {

    if (
        audioContext &&
        audioContext.state === "suspended"
    ) {

        audioContext.resume()
            .catch(error => {

                console.warn(
                    "AudioContext resume failed:",
                    error
                );

            });

    }

}


/* =====================================================
   AMPLITUDE → dBFS
===================================================== */

function amplitudeToDb(amplitude) {

    /*
     * Digital audio can theoretically return
     * values above 1 in some processing situations.
     *
     * Do NOT clamp before clipping detection.
     */

    if (
        !isFinite(amplitude) ||
        amplitude <= 0
    ) {

        return -60;

    }


    const db =
        20 *
        Math.log10(amplitude);


    return Math.max(
        -60,
        db
    );

}


/* =====================================================
   dB → METER PERCENTAGE
===================================================== */

function dbToPercent(db) {

    /*
     * -60 dB = 0%
     *   0 dB = 100%
     */

    return Math.max(
        0,
        Math.min(
            100,
            ((db + 60) / 60) * 100
        )
    );

}


/* =====================================================
   FIND CHANNEL PEAK
===================================================== */

function getChannelPeak(data) {

    let peak = 0;


    for (
        let i = 0;
        i < data.length;
        i++
    ) {

        const sample =
            Math.abs(data[i]);


        if (sample > peak) {

            peak = sample;

        }

    }


    return peak;

}


/* =====================================================
   RESET AUDIO METER
===================================================== */

function resetAudioMeter() {

    leftPeakValue = -60;

    rightPeakValue = -60;

    leftPeakTime =
        performance.now();

    rightPeakTime =
        performance.now();

    clippingUntil = 0;


    if (leftDb) {

        leftDb.textContent =
            "-60.0 dB";

    }


    if (rightDb) {

        rightDb.textContent =
            "-60.0 dB";

    }


    if (leftLevel) {

        leftLevel.style.width =
            "100%";

    }


    if (rightLevel) {

        rightLevel.style.width =
            "100%";

    }


    if (leftPeak) {

        leftPeak.style.left =
            "0%";

    }


    if (rightPeak) {

        rightPeak.style.left =
            "0%";

    }


    if (clippingIndicator) {

        clippingIndicator.classList.remove(
            "active"
        );

    }

}


/* =====================================================
   UPDATE AUDIO METERS
===================================================== */

function updateAudioMeters() {

    /*
     * Keep the animation loop alive even before
     * the audio analyzer is initialized.
     */

    if (
        !audioGraphReady ||
        !leftAnalyser ||
        !rightAnalyser
    ) {

        requestAnimationFrame(
            updateAudioMeters
        );

        return;

    }


    /*
     * Get current time-domain samples.
     */

    leftAnalyser.getFloatTimeDomainData(
        leftData
    );

    rightAnalyser.getFloatTimeDomainData(
        rightData
    );


    /*
     * Find actual peak sample for each channel.
     */

    const leftAmplitude =
        getChannelPeak(
            leftData
        );

    const rightAmplitude =
        getChannelPeak(
            rightData
        );


    /*
     * Convert amplitude to dBFS.
     */

    const leftCurrentDb =
        amplitudeToDb(
            leftAmplitude
        );

    const rightCurrentDb =
        amplitudeToDb(
            rightAmplitude
        );


    /*
     * Update displayed dB values.
     */

    if (leftDb) {

        leftDb.textContent =
            `${leftCurrentDb.toFixed(1)} dB`;

    }


    if (rightDb) {

        rightDb.textContent =
            `${rightCurrentDb.toFixed(1)} dB`;

    }


    /*
     * Convert dB to percentage.
     */

    const leftPercent =
        dbToPercent(
            leftCurrentDb
        );

    const rightPercent =
        dbToPercent(
            rightCurrentDb
        );


    /*
     * The meter uses a dark overlay.
     *
     * Therefore:
     *
     * 0 dB   → overlay 0%
     * -60 dB → overlay 100%
     */

    if (leftLevel) {

        leftLevel.style.width =
            `${100 - leftPercent}%`;

    }


    if (rightLevel) {

        rightLevel.style.width =
            `${100 - rightPercent}%`;

    }


    const now =
        performance.now();


    /* =================================================
       LEFT PEAK HOLD
    ================================================= */

    if (
        leftCurrentDb >=
        leftPeakValue
    ) {

        leftPeakValue =
            leftCurrentDb;

        leftPeakTime =
            now;

    }

    else if (
        now - leftPeakTime >
        PEAK_HOLD_TIME
    ) {

        leftPeakValue =
            Math.max(
                -60,
                leftPeakValue -
                PEAK_FALL_SPEED
            );

    }


    /* =================================================
       RIGHT PEAK HOLD
    ================================================= */

    if (
        rightCurrentDb >=
        rightPeakValue
    ) {

        rightPeakValue =
            rightCurrentDb;

        rightPeakTime =
            now;

    }

    else if (
        now - rightPeakTime >
        PEAK_HOLD_TIME
    ) {

        rightPeakValue =
            Math.max(
                -60,
                rightPeakValue -
                PEAK_FALL_SPEED
            );

    }


    /*
     * Update peak markers.
     */

    if (leftPeak) {

        leftPeak.style.left =
            `${dbToPercent(leftPeakValue)}%`;

    }


    if (rightPeak) {

        rightPeak.style.left =
            `${dbToPercent(rightPeakValue)}%`;

    }


    /* =================================================
       CLIPPING DETECTION
    ================================================= */

    /*
     * 1.0 amplitude = 0 dBFS.
     *
     * Anything >= 1.0 is treated as clipping.
     */

    const leftClipping =
        leftAmplitude >= 1;

    const rightClipping =
        rightAmplitude >= 1;


    const isClipping =
        leftClipping ||
        rightClipping;


    if (isClipping) {

        clippingUntil =
            now +
            CLIPPING_HOLD_TIME;

    }


    if (clippingIndicator) {

        clippingIndicator.classList.toggle(
            "active",
            now < clippingUntil
        );

    }


    /*
     * Continue animation.
     */

    requestAnimationFrame(
        updateAudioMeters
    );

}


/* =====================================================
   CREATE PLAYLIST
===================================================== */

function createPlaylist(filter = "") {

    playlist.innerHTML = "";


    const query =
        filter
            .toLowerCase()
            .trim();


    const filteredSongs =
        songs
            .map((song, index) => ({
                song,
                index
            }))
            .filter(item =>
                item.song
                    .toLowerCase()
                    .includes(query)
            );


    songCount.textContent =
        `${filteredSongs.length} / ${songs.length} songs`;


    if (
        filteredSongs.length === 0
    ) {

        playlist.innerHTML = `
            <div class="empty">
                No songs found
            </div>
        `;

        return;

    }


    filteredSongs.forEach(item => {

        const row =
            document.createElement("div");


        row.className =
            "song";


        if (
            item.index === currentSong
        ) {

            row.classList.add(
                "active"
            );

        }


        const number =
            String(
                item.index + 1
            )
            .padStart(
                2,
                "0"
            );


        const statusIcon =
            item.index === currentSong &&
            !audio.paused

            ? `
                <svg
                    class="icon"
                    viewBox="0 0 24 24"
                >

                    <rect
                        x="7"
                        y="5"
                        width="4"
                        height="14"
                        rx="1"
                        fill="currentColor"
                        stroke="none"
                    />

                    <rect
                        x="13"
                        y="5"
                        width="4"
                        height="14"
                        rx="1"
                        fill="currentColor"
                        stroke="none"
                    />

                </svg>
              `

            : `
                <svg
                    class="icon"
                    viewBox="0 0 24 24"
                >

                    <circle
                        cx="12"
                        cy="12"
                        r="3"
                        fill="currentColor"
                        stroke="none"
                    />

                </svg>
              `;


        row.innerHTML = `

            <div class="song-number">
                ${number}
            </div>

            <div class="song-info">

                <div class="song-name">
                    ${escapeHTML(
                        removeExtension(
                            item.song
                        )
                    )}
                </div>

            </div>

            <div class="song-status">
                ${statusIcon}
            </div>

        `;


        row.addEventListener(
            "click",
            () => {

                loadSong(
                    item.index
                );

                playSong();

            }
        );


        playlist.appendChild(
            row
        );

    });

}


/* =====================================================
   LOAD SONG
===================================================== */

function loadSong(index) {

    if (index < 0) {

        index =
            songs.length - 1;

    }


    if (
        index >= songs.length
    ) {

        index = 0;

    }


    currentSong =
        index;


    /*
     * Reset meter so the previous song's
     * peak does not carry into the next song.
     */

    resetAudioMeter();


    const file =
        songs[currentSong];


    audio.src =
        "audio/" +
        encodeURIComponent(
            file
        );


    songTitle.textContent =
        removeExtension(
            file
        );


    songNumber.textContent =
        `Track ${
            String(
                currentSong + 1
            )
            .padStart(
                2,
                "0"
            )
        } of ${
            String(
                songs.length
            )
            .padStart(
                2,
                "0"
            )
        }`;


    progressBar.style.width =
        "0%";


    progressThumb.style.left =
        "0%";


    currentTime.textContent =
        "0:00";


    duration.textContent =
        "0:00";


    createPlaylist(
        search.value
    );

}


/* =====================================================
   PLAY
===================================================== */

function playSong() {

    /*
     * User interaction starts/resumes the
     * Web Audio context.
     */

    initializeAudioAnalyzer();

    resumeAudioContext();


    audio.play()
        .then(() => {

            playIcon.innerHTML =
                PAUSE_ICON;


            playBtn.setAttribute(
                "aria-label",
                "Pause"
            );


            playBtn.setAttribute(
                "title",
                "Pause"
            );


            createPlaylist(
                search.value
            );

        })
        .catch(error => {

            console.log(
                "Audio playback error:",
                error
            );

        });

}


/* =====================================================
   PAUSE
===================================================== */

function pauseSong() {

    audio.pause();


    playIcon.innerHTML =
        PLAY_ICON;


    playBtn.setAttribute(
        "aria-label",
        "Play"
    );


    playBtn.setAttribute(
        "title",
        "Play"
    );


    createPlaylist(
        search.value
    );

}


/* =====================================================
   AUDIO PLAY EVENT
===================================================== */

audio.addEventListener(
    "play",
    () => {

        initializeAudioAnalyzer();

        resumeAudioContext();

        playIcon.innerHTML =
            PAUSE_ICON;

        playBtn.setAttribute(
            "aria-label",
            "Pause"
        );

        playBtn.setAttribute(
            "title",
            "Pause"
        );

        createPlaylist(
            search.value
        );

    }
);


/* =====================================================
   AUDIO PAUSE EVENT
===================================================== */

audio.addEventListener(
    "pause",
    () => {

        playIcon.innerHTML =
            PLAY_ICON;

        playBtn.setAttribute(
            "aria-label",
            "Play"
        );

        playBtn.setAttribute(
            "title",
            "Play"
        );

        createPlaylist(
            search.value
        );

    }
);


/* =====================================================
   PLAY / PAUSE
===================================================== */

playBtn.addEventListener(
    "click",
    () => {

        if (audio.paused) {

            playSong();

        }

        else {

            pauseSong();

        }

    }
);


/* =====================================================
   NEXT
===================================================== */

nextBtn.addEventListener(
    "click",
    () => {

        if (shuffle) {

            playRandomSong();

        }

        else {

            loadSong(
                currentSong + 1
            );

            playSong();

        }

    }
);


/* =====================================================
   PREVIOUS
===================================================== */

previousBtn.addEventListener(
    "click",
    () => {

        loadSong(
            currentSong - 1
        );

        playSong();

    }
);


/* =====================================================
   BACK 10
===================================================== */

backBtn.addEventListener(
    "click",
    () => {

        audio.currentTime =
            Math.max(
                0,
                audio.currentTime - 10
            );

    }
);


/* =====================================================
   FORWARD 10
===================================================== */

forwardBtn.addEventListener(
    "click",
    () => {

        if (!audio.duration) {

            return;

        }


        audio.currentTime =
            Math.min(
                audio.duration,
                audio.currentTime + 10
            );

    }
);


/* =====================================================
   PROGRESS UPDATE
===================================================== */

audio.addEventListener(
    "timeupdate",
    () => {

        if (
            !audio.duration ||
            isDragging
        ) {

            return;

        }


        updateProgress(
            audio.currentTime
        );

    }
);


function updateProgress(time) {

    if (!audio.duration) {

        return;

    }


    const percent =
        (
            time /
            audio.duration
        ) * 100;


    progressBar.style.width =
        percent + "%";


    progressThumb.style.left =
        percent + "%";


    currentTime.textContent =
        formatTime(
            time
        );

}


/* =====================================================
   DURATION
===================================================== */

audio.addEventListener(
    "loadedmetadata",
    () => {

        duration.textContent =
            formatTime(
                audio.duration
            );

    }
);


/* =====================================================
   SEEK
===================================================== */

function seekFromPointer(
    clientX
) {

    if (!audio.duration) {

        return;

    }


    const rect =
        progressTrack.getBoundingClientRect();


    let position =
        clientX -
        rect.left;


    position =
        Math.max(
            0,
            Math.min(
                position,
                rect.width
            )
        );


    const percent =
        position /
        rect.width;


    const newTime =
        percent *
        audio.duration;


    audio.currentTime =
        newTime;


    updateProgress(
        newTime
    );

}


/* =====================================================
   MOUSE DRAG
===================================================== */

progressTrack.addEventListener(
    "mousedown",
    event => {

        isDragging =
            true;


        progressTrack.classList.add(
            "dragging"
        );


        seekFromPointer(
            event.clientX
        );

    }
);


document.addEventListener(
    "mousemove",
    event => {

        if (!isDragging) {

            return;

        }


        seekFromPointer(
            event.clientX
        );

    }
);


document.addEventListener(
    "mouseup",
    () => {

        if (!isDragging) {

            return;

        }


        isDragging =
            false;


        progressTrack.classList.remove(
            "dragging"
        );

    }
);


/* =====================================================
   MOBILE TOUCH DRAG
===================================================== */

progressTrack.addEventListener(
    "touchstart",
    event => {

        isDragging =
            true;


        progressTrack.classList.add(
            "dragging"
        );


        seekFromPointer(
            event.touches[0].clientX
        );

    },
    {
        passive: true
    }
);


document.addEventListener(
    "touchmove",
    event => {

        if (!isDragging) {

            return;

        }


        seekFromPointer(
            event.touches[0].clientX
        );

    },
    {
        passive: true
    }
);


document.addEventListener(
    "touchend",
    () => {

        if (!isDragging) {

            return;

        }


        isDragging =
            false;


        progressTrack.classList.remove(
            "dragging"
        );

    }
);


/* =====================================================
   SONG ENDED
===================================================== */

audio.addEventListener(
    "ended",
    () => {

        if (repeat) {

            audio.currentTime =
                0;


            playSong();


            return;

        }


        pauseSong();


        audio.currentTime =
            audio.duration;


        updateProgress(
            audio.duration
        );

    }
);


/* =====================================================
   REPEAT
===================================================== */

repeatBtn.addEventListener(
    "click",
    () => {

        repeat =
            !repeat;


        repeatBtn.classList.toggle(
            "active",
            repeat
        );

    }
);


/* =====================================================
   SHUFFLE
===================================================== */

shuffleBtn.addEventListener(
    "click",
    () => {

        shuffle =
            !shuffle;


        shuffleBtn.classList.toggle(
            "active",
            shuffle
        );

    }
);


/* =====================================================
   RANDOM SONG
===================================================== */

function playRandomSong() {

    if (
        songs.length <= 1
    ) {

        playSong();

        return;

    }


    let random;


    do {

        random =
            Math.floor(
                Math.random() *
                songs.length
            );

    }

    while (
        random === currentSong
    );


    loadSong(
        random
    );


    playSong();

}


/* =====================================================
   SPEED
===================================================== */

speed.addEventListener(
    "change",
    () => {

        audio.playbackRate =
            Number(
                speed.value
            );

    }
);


/* =====================================================
   VOLUME
===================================================== */

volume.addEventListener(
    "input",
    () => {

        audio.volume =
            Number(
                volume.value
            );


        if (
            audio.volume > 0
        ) {

            previousVolume =
                audio.volume;


            volumeIcon.innerHTML =
                VOLUME_ICON;

        }

        else {

            volumeIcon.innerHTML =
                MUTE_ICON;

        }

    }
);


/* =====================================================
   MUTE
===================================================== */

muteBtn.addEventListener(
    "click",
    () => {

        if (
            audio.volume > 0
        ) {

            previousVolume =
                audio.volume;


            audio.volume =
                0;


            volume.value =
                0;


            volumeIcon.innerHTML =
                MUTE_ICON;

        }

        else {

            audio.volume =
                previousVolume || 1;


            volume.value =
                audio.volume;


            volumeIcon.innerHTML =
                VOLUME_ICON;

        }

    }
);


/* =====================================================
   SEARCH
===================================================== */

search.addEventListener(
    "input",
    () => {

        createPlaylist(
            search.value
        );

    }
);


/* =====================================================
   KEYBOARD SHORTCUTS
===================================================== */

document.addEventListener(
    "keydown",
    event => {

        /*
         * Don't trigger shortcuts while typing
         * in the search box.
         */

        if (
            document.activeElement === search
        ) {

            return;

        }


        /* =============================================
           SPACE = PLAY / PAUSE
        ============================================= */

        if (
            event.code === "Space"
        ) {

            event.preventDefault();


            if (audio.paused) {

                playSong();

            }

            else {

                pauseSong();

            }

        }


        /* =============================================
           LEFT = BACK 10 SEC
        ============================================= */

        if (
            event.code === "ArrowLeft"
        ) {

            event.preventDefault();


            audio.currentTime =
                Math.max(
                    0,
                    audio.currentTime - 10
                );

        }


        /* =============================================
           RIGHT = FORWARD 10 SEC
        ============================================= */

        if (
            event.code === "ArrowRight"
        ) {

            event.preventDefault();


            if (!audio.duration) {

                return;

            }


            audio.currentTime =
                Math.min(
                    audio.duration,
                    audio.currentTime + 10
                );

        }


        /* =============================================
           UP = VOLUME +
        ============================================= */

        if (
            event.code === "ArrowUp"
        ) {

            event.preventDefault();


            audio.volume =
                Math.min(
                    1,
                    audio.volume + 0.1
                );


            volume.value =
                audio.volume;


            if (
                audio.volume > 0
            ) {

                volumeIcon.innerHTML =
                    VOLUME_ICON;

            }

        }


        /* =============================================
           DOWN = VOLUME -
        ============================================= */

        if (
            event.code === "ArrowDown"
        ) {

            event.preventDefault();


            audio.volume =
                Math.max(
                    0,
                    audio.volume - 0.1
                );


            volume.value =
                audio.volume;


            if (
                audio.volume === 0
            ) {

                volumeIcon.innerHTML =
                    MUTE_ICON;

            }

            else {

                volumeIcon.innerHTML =
                    VOLUME_ICON;

            }

        }


        /* =============================================
           N = NEXT
        ============================================= */

        if (
            event.key.toLowerCase() === "n"
        ) {

            if (shuffle) {

                playRandomSong();

            }

            else {

                loadSong(
                    currentSong + 1
                );

                playSong();

            }

        }


        /* =============================================
           P = PREVIOUS
        ============================================= */

        if (
            event.key.toLowerCase() === "p"
        ) {

            loadSong(
                currentSong - 1
            );

            playSong();

        }

    }
);


/* =====================================================
   HELPERS
===================================================== */

function formatTime(seconds) {

    if (
        !seconds ||
        isNaN(seconds)
    ) {

        return "0:00";

    }


    const minutes =
        Math.floor(
            seconds / 60
        );


    const secondsPart =
        Math.floor(
            seconds % 60
        )
        .toString()
        .padStart(
            2,
            "0"
        );


    return `${minutes}:${secondsPart}`;

}


function removeExtension(
    filename
) {

    return filename
        .replace(
            /\.[^/.]+$/,
            ""
        );

}


function escapeHTML(text) {

    return text
        .replace(
            /&/g,
            "&amp;"
        )
        .replace(
            /</g,
            "&lt;"
        )
        .replace(
            />/g,
            "&gt;"
        )
        .replace(
            /"/g,
            "&quot;"
        )
        .replace(
            /'/g,
            "&#039;"
        );

}


/* =====================================================
   INITIALIZE
===================================================== */

audio.volume = 1;

resetAudioMeter();

createPlaylist();

loadSong(0);
