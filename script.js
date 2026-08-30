/* =====================================================
   JANMASHTAMI PLAYER
   FINAL UPGRADED VERSION

   AUDIO:
   Local MP3 → direct playback
   Online MP3 → direct playback + analyser if available

   VISUALS:
   Local MP4 → first
   Cloudinary MP4 → fallback

   DEFAULT:
   Visuals

   IMPORTANT:
   When a track naturally ends:
   → next track loads
   → NO autoplay

   Manual Next button:
   → next track loads
   → plays immediately
===================================================== */


/* =====================================================
   SONG LIST
===================================================== */

const songs = [
    "01_ganesh-vandana.mp3",
    "02_presentation-class-1-3.mp3",
    "03_ashtaavtaar.mp3",
    "04_krishna-janm.mp3",
    "05_brahmand-darshan.mp3",
    "06_dahi-handi.mp3",
    "07_akroor-yashoda.mp3",
    "08_radha-krishna.mp3",
    "09_kubja.mp3",
    "10_kans-krishna.mp3",
    "11_balram-krishna.mp3",
    "12_sudama.mp3",
    "13_shishupal.mp3",
    "14_krishna-draupadi.mp3",
    "15_shakuni-duryodhan.mp3",
    "16_cheer-haran.mp3",
    "17_shanti-doot.mp3",
    "18_geeta-updesh.mp3",
    "19_gandhari-shraap.mp3",
    "20_dwarka-vileen.mp3",
    "21_krishna-bhakt.mp3",
    "22_buddh-kalki.mp3",
    "23_krishna-manch-agman.mp3",
    "24_madhurashtak.mp3"
];


/* =====================================================
   VIDEO SOURCES
=====================================================

   LOCAL:
   videos/filename.mp4

   CLOUDINARY:
   Paste full Cloudinary MP4 URL.

   Example:

   cloudinary:
       "https://res.cloudinary.com/xxx/video/upload/xxx/file.mp4"

   Behaviour:

   1. Local video is tried first.
   2. If local video fails, Cloudinary is tried.
   3. If both fail, Visual unavailable is shown.

===================================================== */

const videos = {

    "01_ganesh-vandana.mp3": {
        local: "videos/01_ganesh-vandana.mp4",
        cloudinary: "https://res.cloudinary.com/dew69gkkw/video/upload/v1787974142/01_ganesh-vandana_qtl8ao.mp4"
    },

    "02_presentation-class-1-3.mp3": {
        local: "videos/02_presentation-class-1-3.mp4",
        cloudinary: ""
    },

    "03_ashtaavtaar.mp3": {
        local: "videos/03_ashtaavtaar.mp4",
        cloudinary: "https://res.cloudinary.com/dew69gkkw/video/upload/v1787977965/03_ashtavatar_bacij2.mp4"
    },

    "04_krishna-janm.mp3": {
        local: "videos/04_krishna-janm.mp4",
        cloudinary: "https://res.cloudinary.com/dew69gkkw/video/upload/v1788061400/04_krishna-janm-compressed_nlsjw1.mp4"
    },

    "05_brahmand-darshan.mp3": {
        local: "videos/05_brahmand-darshan.mp4",
        cloudinary: "https://res.cloudinary.com/dew69gkkw/video/upload/v1787974033/05_bhrahmand-darshan_zbwjwa.mp4"
    },

    "06_dahi-handi.mp3": {
        local: "videos/06_dahi-handi.mp4",
        cloudinary: "https://res.cloudinary.com/dew69gkkw/video/upload/v1787978621/06_dahi-handi_lx6fsw.mp4"
    },

    "07_akroor-yashoda.mp3": {
        local: "videos/07_akroor-yashoda.mp4",
        cloudinary: "https://res.cloudinary.com/dew69gkkw/video/upload/v1787973973/07_akroor-yashoda_p9aoif.mp4"
    },

    "08_radha-krishna.mp3": {
        local: "videos/08_radha-krishna.mp4",
        cloudinary: ""
    },

    "09_kubja.mp3": {
        local: "videos/09_kubja.mp4",
        cloudinary: "https://res.cloudinary.com/dew69gkkw/video/upload/v1787974035/09_kubja_migwil.mp4"
    },

    "10_kans-krishna.mp3": {
        local: "videos/10_kans-krishna.mp4",
        cloudinary: "https://res.cloudinary.com/dew69gkkw/video/upload/v1788059181/10_kans-krishna_yjwcel.mp4"
    },

    "11_balram-krishna.mp3": {
        local: "videos/11_balram-krishna.mp4",
        cloudinary: ""
    },

    "12_sudama.mp3": {
        local: "videos/12_sudama.mp4",
        cloudinary: "https://res.cloudinary.com/dew69gkkw/video/upload/v1787974095/12_sudama_w4gg9i.mp4"
    },

    "13_shishupal.mp3": {
        local: "videos/13_shishupal.mp4",
        cloudinary: "https://res.cloudinary.com/dew69gkkw/video/upload/v1787974133/13_shishupal_jmmzh5.mp4"
    },

    "14_krishna-draupadi.mp3": {
        local: "videos/14_krishna-draupadi.mp4",
        cloudinary: "https://res.cloudinary.com/dew69gkkw/video/upload/v1787974042/14_krishna-draupdi_poyo1k.mp4"
    },

    "15_shakuni-duryodhan.mp3": {
        local: "videos/15_shakuni-duryodhan.mp4",
        cloudinary: "https://res.cloudinary.com/dew69gkkw/video/upload/v1788059175/15_shakuni-duryodhan_y1amho.mp4"
    },

    "16_cheer-haran.mp3": {
        local: "videos/16_cheer-haran.mp4",
        cloudinary: "https://res.cloudinary.com/dew69gkkw/video/upload/v1788061408/16_cheer-haran-compressed_be2hvo.mp4"
    },

    "17_shanti-doot.mp3": {
        local: "videos/17_shanti-doot.mp4",
        cloudinary: "https://res.cloudinary.com/dew69gkkw/video/upload/v1788059188/17_shanti-doot_bzuevp.mp4"
    },

    "18_geeta-updesh.mp3": {
        local: "videos/18_geeta-updesh.mp4",
        cloudinary: ""
    },

    "19_gandhari-shraap.mp3": {
        local: "videos/19_gandhari-shraap.mp4",
        cloudinary: "https://res.cloudinary.com/dew69gkkw/video/upload/v1787974127/19_gandhari-shraap_dplv6u.mp4"
    },

    "20_dwarka-vileen.mp3": {
        local: "videos/20_dwarka-vileen.mp4",
        cloudinary: "https://res.cloudinary.com/dew69gkkw/video/upload/v1787974082/20_dwarka-vileen_pdmozj.mp4"
    },

    "21_krishna-bhakt.mp3": {
        local: "videos/21_krishna-bhakt.mp4",
        cloudinary: "https://res.cloudinary.com/dew69gkkw/video/upload/v1787974142/21_krishna-bhakt_jztlcb.mp4"
    },

    "22_buddh-kalki.mp3": {
        local: "videos/22_buddh-kalki.mp4",
        cloudinary: "https://res.cloudinary.com/dew69gkkw/video/upload/v1787974060/22_budh-kalki_rkbbgx.mp4"
    },

    "23_krishna-manch-agman.mp3": {
        local: "videos/23_krishna-manch-agman.mp4",
        cloudinary: "https://res.cloudinary.com/dew69gkkw/video/upload/v1787974138/23_krishna-mach-agman_dgwxml.mp4"
    },

    "24_madhurashtak.mp3": {
        local: "videos/24_madhurashtak.mp4",
        cloudinary: "https://res.cloudinary.com/dew69gkkw/video/upload/v1788061429/24_madhurashtak-compressed_alh2o1.mp4"
    }

};


/* =====================================================
   ELEMENTS
===================================================== */

const audio =
    document.getElementById("audio");

const video =
    document.getElementById("video");

const audioCard =
    document.getElementById("audioCard");

const visualCard =
    document.getElementById("visualCard");

const audioModeBtn =
    document.getElementById("audioModeBtn");

const visualModeBtn =
    document.getElementById("visualModeBtn");

const visualTitle =
    document.getElementById("visualTitle");

const visualNumber =
    document.getElementById("visualNumber");

const videoError =
    document.getElementById("videoError");

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
   AUDIO METER ELEMENTS
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

let currentMode = "visual";

let repeat = false;

let shuffle = false;

let isDragging = false;

let previousVolume = 1;


/* =====================================================
   VIDEO STATE
===================================================== */

let videoAttemptId = 0;


/* =====================================================
   WEB AUDIO ANALYSER
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

const PEAK_HOLD_TIME = 1500;

const PEAK_FALL_SPEED = 0.35;

const CLIPPING_HOLD_TIME = 250;


/* =====================================================
   ICONS
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
   HELPERS
===================================================== */

function removeExtension(filename) {

    return filename.replace(
        /\.[^/.]+$/,
        ""
    );

}


function escapeHTML(text) {

    const div =
        document.createElement("div");

    div.textContent =
        text;

    return div.innerHTML;

}


function formatTime(seconds) {

    if (
        !isFinite(seconds) ||
        seconds < 0
    ) {

        return "0:00";

    }


    const minutes =
        Math.floor(
            seconds / 60
        );


    const secs =
        Math.floor(
            seconds % 60
        )
        .toString()
        .padStart(
            2,
            "0"
        );


    return `${minutes}:${secs}`;

}


/* =====================================================
   AUDIO ANALYSER INITIALIZATION
===================================================== */

function initializeAudioAnalyzer() {

    /*
     * IMPORTANT:
     *
     * When running directly through file://,
     * do not connect the media element to Web Audio.
     *
     * This ensures the local MP3 keeps normal
     * browser audio playback.
     */

    if (
        window.location.protocol === "file:"
    ) {

        return;

    }


    if (
        audioGraphReady
    ) {

        if (
            audioContext &&
            audioContext.state === "suspended"
        ) {

            audioContext
                .resume()
                .catch(
                    () => {}
                );

        }

        return;

    }


    const AudioContext =
        window.AudioContext ||
        window.webkitAudioContext;


    if (!AudioContext) {

        return;

    }


    try {

        audioContext =
            new AudioContext();


        mediaSource =
            audioContext.createMediaElementSource(
                audio
            );


        channelSplitter =
            audioContext.createChannelSplitter(
                2
            );


        leftAnalyser =
            audioContext.createAnalyser();


        rightAnalyser =
            audioContext.createAnalyser();


        leftAnalyser.fftSize =
            2048;


        rightAnalyser.fftSize =
            2048;


        leftAnalyser.smoothingTimeConstant =
            0.08;


        rightAnalyser.smoothingTimeConstant =
            0.08;


        leftData =
            new Float32Array(
                leftAnalyser.fftSize
            );


        rightData =
            new Float32Array(
                rightAnalyser.fftSize
            );


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


        mediaSource.connect(
            audioContext.destination
        );


        audioGraphReady =
            true;


        requestAnimationFrame(
            updateAudioMeters
        );

    }

    catch (error) {

        console.warn(
            "Audio analyser unavailable:",
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

        audioContext
            .resume()
            .catch(
                () => {}
            );

    }

}


/* =====================================================
   AMPLITUDE → DB
===================================================== */

function amplitudeToDb(
    amplitude
) {

    if (
        !isFinite(amplitude) ||
        amplitude <= 0
    ) {

        return -60;

    }


    return Math.max(
        -60,
        20 * Math.log10(
            amplitude
        )
    );

}


/* =====================================================
   DB → PERCENT
===================================================== */

function dbToPercent(db) {

    return Math.max(
        0,
        Math.min(
            100,
            ((db + 60) / 60) * 100
        )
    );

}


/* =====================================================
   CHANNEL PEAK
===================================================== */

function getChannelPeak(data) {

    let peak = 0;


    for (
        let i = 0;
        i < data.length;
        i++
    ) {

        const sample =
            Math.abs(
                data[i]
            );


        if (
            sample > peak
        ) {

            peak = sample;

        }

    }


    return peak;

}


/* =====================================================
   RESET AUDIO METER
===================================================== */

function resetAudioMeter() {

    leftPeakValue =
        -60;


    rightPeakValue =
        -60;


    leftPeakTime =
        performance.now();


    rightPeakTime =
        performance.now();


    clippingUntil =
        0;


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
   LOCAL METER
=====================================================

   Used only for direct file:// playback.

   It does NOT touch the audio output.
===================================================== */

function updateLocalMeter() {

    if (
        currentMode !== "audio" ||
        audio.paused
    ) {

        if (leftLevel) {

            leftLevel.style.width =
                "100%";

        }


        if (rightLevel) {

            rightLevel.style.width =
                "100%";

        }


        if (leftDb) {

            leftDb.textContent =
                "-60.0 dB";

        }


        if (rightDb) {

            rightDb.textContent =
                "-60.0 dB";

        }


        requestAnimationFrame(
            updateLocalMeter
        );

        return;

    }


    const leftMovement =
        15 +
        Math.random() * 75;


    const rightMovement =
        15 +
        Math.random() * 75;


    if (leftLevel) {

        leftLevel.style.width =
            `${100 - leftMovement}%`;

    }


    if (rightLevel) {

        rightLevel.style.width =
            `${100 - rightMovement}%`;

    }


    if (leftDb) {

        leftDb.textContent =
            `${(
                -60 +
                leftMovement * 0.6
            ).toFixed(1)} dB`;

    }


    if (rightDb) {

        rightDb.textContent =
            `${(
                -60 +
                rightMovement * 0.6
            ).toFixed(1)} dB`;

    }


    requestAnimationFrame(
        updateLocalMeter
    );

}


/* =====================================================
   REAL AUDIO METERS
===================================================== */

function updateAudioMeters() {

    /*
     * Local file:
     * Web Audio analyser is intentionally disabled.
     */

    if (
        window.location.protocol === "file:"
    ) {

        requestAnimationFrame(
            updateAudioMeters
        );

        return;

    }


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


    leftAnalyser.getFloatTimeDomainData(
        leftData
    );


    rightAnalyser.getFloatTimeDomainData(
        rightData
    );


    const leftAmplitude =
        getChannelPeak(
            leftData
        );


    const rightAmplitude =
        getChannelPeak(
            rightData
        );


    const leftCurrentDb =
        amplitudeToDb(
            leftAmplitude
        );


    const rightCurrentDb =
        amplitudeToDb(
            rightAmplitude
        );


    if (leftDb) {

        leftDb.textContent =
            `${leftCurrentDb.toFixed(1)} dB`;

    }


    if (rightDb) {

        rightDb.textContent =
            `${rightCurrentDb.toFixed(1)} dB`;

    }


    const leftPercent =
        dbToPercent(
            leftCurrentDb
        );


    const rightPercent =
        dbToPercent(
            rightCurrentDb
        );


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


    if (leftPeak) {

        leftPeak.style.left =
            `${dbToPercent(
                leftPeakValue
            )}%`;

    }


    if (rightPeak) {

        rightPeak.style.left =
            `${dbToPercent(
                rightPeakValue
            )}%`;

    }


    if (
        leftAmplitude >= 1 ||
        rightAmplitude >= 1
    ) {

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


    requestAnimationFrame(
        updateAudioMeters
    );

}


/* =====================================================
   MODE SWITCH
===================================================== */

function setMode(mode) {

    currentMode =
        mode;


    if (
        mode === "audio"
    ) {

        audioModeBtn.classList.add(
            "active"
        );


        visualModeBtn.classList.remove(
            "active"
        );


        visualCard.hidden =
            true;


        audioCard.hidden =
            false;


        /*
         * Audio mode means video must stop.
         */

        video.pause();

    }

    else {

        visualModeBtn.classList.add(
            "active"
        );


        audioModeBtn.classList.remove(
            "active"
        );


        visualCard.hidden =
            false;


        audioCard.hidden =
            true;


        /*
         * Visual mode means audio must stop.
         */

        audio.pause();

    }


    updatePlayButton();


    createPlaylist(
        search.value
    );

}


/* =====================================================
   AUDIO MODE BUTTON
===================================================== */

audioModeBtn.addEventListener(
    "click",
    () => {

        setMode(
            "audio"
        );

    }
);


/* =====================================================
   VISUAL MODE BUTTON
===================================================== */

visualModeBtn.addEventListener(
    "click",
    () => {

        setMode(
            "visual"
        );

    }
);


/* =====================================================
   PLAYLIST
===================================================== */

function createPlaylist(
    filter = ""
) {

    playlist.innerHTML =
        "";


    const query =
        filter
            .toLowerCase()
            .trim();


    const filteredSongs =
        songs
            .map(
                (
                    song,
                    index
                ) => ({
                    song,
                    index
                })
            )
            .filter(
                item =>
                    item.song
                        .toLowerCase()
                        .includes(
                            query
                        )
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


    filteredSongs.forEach(
        item => {

            const row =
                document.createElement(
                    "div"
                );


            row.className =
                "song";


            if (
                item.index ===
                currentSong
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


            const isPlaying =
                item.index === currentSong &&
                (
                    currentMode === "audio"
                        ? !audio.paused
                        : !video.paused
                );


            const statusIcon =
                isPlaying
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

                    /*
                     * Clicking a playlist item is
                     * an intentional user action,
                     * so it plays immediately.
                     */

                    playCurrent();

                }
            );


            playlist.appendChild(
                row
            );

        }
    );

}


/* =====================================================
   LOAD SONG
===================================================== */

function loadSong(index) {

    if (
        index < 0
    ) {

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


    const file =
        songs[currentSong];


    /*
     * Cancel any old video attempt.
     */

    videoAttemptId++;


    /*
     * Stop both players.
     */

    audio.pause();

    video.pause();


    /*
     * Clear video source.
     */

    video.removeAttribute(
        "src"
    );

    video.load();


    /*
     * Reset meter.
     */

    resetAudioMeter();




    /* =====================================================
   PREPARE VIDEO
=====================================================

   Checks video availability WITHOUT autoplay.

   Priority:
   1. Local MP4
   2. Cloudinary MP4
   3. Error message

===================================================== */

function prepareVideo(
    file,
    videoInfo
) {

    const attempt =
        ++videoAttemptId;


    const localUrl =
        videoInfo.local || "";


    const cloudinaryUrl =
        videoInfo.cloudinary || "";


    videoError.hidden =
        true;


    video.dataset.videoReady =
        "false";


    /* =============================================
       NOTHING CONFIGURED
    ============================================= */

    if (
        !localUrl &&
        !cloudinaryUrl
    ) {

        showVideoUnavailable();

        return;

    }


    /* =============================================
       TRY LOCAL FIRST
    ============================================= */

    if (
        localUrl
    ) {

        testVideoSource(
            localUrl,
            attempt,
            () => {

                /*
                 * Local video works.
                 * Keep it loaded but DON'T play.
                 */

                if (
                    attempt !== videoAttemptId
                ) {

                    return;

                }


                video.src =
                    localUrl;

                video.dataset.videoReady =
                    "true";

                videoError.hidden =
                    true;

                video.load();

            },
            () => {

                /*
                 * Local failed.
                 * Try Cloudinary.
                 */

                if (
                    attempt !== videoAttemptId
                ) {

                    return;

                }


                if (
                    cloudinaryUrl
                ) {

                    testVideoSource(
                        cloudinaryUrl,
                        attempt,
                        () => {

                            if (
                                attempt !==
                                videoAttemptId
                            ) {

                                return;

                            }


                            video.src =
                                cloudinaryUrl;

                            video.dataset.videoReady =
                                "true";

                            videoError.hidden =
                                true;

                            video.load();

                        },
                        () => {

                            if (
                                attempt !==
                                videoAttemptId
                            ) {

                                return;

                            }


                            showVideoUnavailable();

                        }
                    );

                }

                else {

                    showVideoUnavailable();

                }

            }
        );

        return;

    }


    /* =============================================
       NO LOCAL → TRY CLOUDINARY
    ============================================= */

    if (
        cloudinaryUrl
    ) {

        testVideoSource(
            cloudinaryUrl,
            attempt,
            () => {

                if (
                    attempt !==
                    videoAttemptId
                ) {

                    return;

                }


                video.src =
                    cloudinaryUrl;

                video.dataset.videoReady =
                    "true";

                videoError.hidden =
                    true;

                video.load();

            },
            () => {

                if (
                    attempt !==
                    videoAttemptId
                ) {

                    return;

                }


                showVideoUnavailable();

            }
        );

    }

}


/* =====================================================
   TEST VIDEO SOURCE
===================================================== */

function testVideoSource(
    url,
    attempt,
    onSuccess,
    onFail
) {

    const tester =
        document.createElement(
            "video"
        );


    let finished =
        false;


    const cleanup =
        () => {

            tester.removeAttribute(
                "src"
            );

            tester.load();

        };


    const success =
        () => {

            if (
                finished ||
                attempt !== videoAttemptId
            ) {

                return;

            }


            finished =
                true;


            cleanup();

            onSuccess();

        };


    const failure =
        () => {

            if (
                finished ||
                attempt !== videoAttemptId
            ) {

                return;

            }


            finished =
                true;


            cleanup();

            onFail();

        };


    tester.preload =
        "metadata";


    tester.muted =
        true;


    tester.onloadedmetadata =
        success;


    tester.onerror =
        failure;


    /*
     * Some browsers don't fire metadata
     * for certain remote files immediately.
     */

    tester.oncanplay =
        success;


    tester.src =
        url;


    tester.load();


    /*
     * Safety timeout.
     */

    setTimeout(
        () => {

            if (
                !finished
            ) {

                failure();

            }

        },
        8000
    );

}


/* =====================================================
   VIDEO UNAVAILABLE
===================================================== */

function showVideoUnavailable() {

    video.dataset.videoReady =
        "false";


    videoError.hidden =
        false;


    /*
     * Keep the video element clean.
     */

    video.pause();

    video.removeAttribute(
        "src"
    );

    video.load();


    updatePlayButton();

}


    /* =================================================
       LOAD AUDIO
    ================================================= */

    audio.src =
        "audio/" +
        encodeURIComponent(
            file
        );


    audio.load();


    /* =================================================
       LOAD VIDEO
    ================================================= */

    const videoInfo =
        videos[file] || {};


    video.dataset.local =
        videoInfo.local || "";


    video.dataset.cloudinary =
        videoInfo.cloudinary || "";


    /*
     * Prepare local video.
     *
     * This DOES NOT autoplay.
     */

/* =================================================
   PREPARE VIDEO + CHECK AVAILABILITY
================================================= */

videoError.hidden = true;

video.dataset.videoReady = "false";

prepareVideo(
    file,
    videoInfo
);

    /* =================================================
       TITLES
    ================================================= */

    const title =
        removeExtension(
            file
        );


    songTitle.textContent =
        title;


    visualTitle.textContent =
        title;


    const trackNumber =
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


    songNumber.textContent =
        trackNumber;


    visualNumber.textContent =
        trackNumber;


    /* =================================================
       RESET PROGRESS
    ================================================= */

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
   PLAY CURRENT
===================================================== */

function playCurrent() {

    if (
        currentMode === "audio"
    ) {

        playAudio();

    }

    else {

        playVideo();

    }

}


/* =====================================================
   PLAY AUDIO
===================================================== */

function playAudio() {

    /*
     * Video must never play together
     * with audio mode.
     */

    video.pause();


    /*
     * Only use Web Audio analyser online.
     * Local file playback stays native.
     */

    if (
        window.location.protocol !==
        "file:"
    ) {

        initializeAudioAnalyzer();

        resumeAudioContext();

    }


    audio.play()
        .then(
            () => {

                updatePlayButton();

                createPlaylist(
                    search.value
                );

            }
        )
        .catch(
            error => {

                console.error(
                    "Audio playback failed:",
                    error
                );

            }
        );

}


/* =====================================================
   PLAY VIDEO
===================================================== */

async function playVideo() {

    /*
     * Stop audio.
     */

    audio.pause();


        /*
     * If availability check already confirmed
     * that no video exists, don't try again.
     */

    if (
        video.dataset.videoReady !== "true"
    ) {

        showVideoUnavailable();

        return;

    }


    const file =
        songs[currentSong];


    const videoInfo =
        videos[file] || {};


    const localUrl =
        videoInfo.local || "";


    const cloudinaryUrl =
        videoInfo.cloudinary || "";


    const attempt =
        ++videoAttemptId;


    videoError.hidden =
        true;


    /* =================================================
       TRY LOCAL VIDEO
    ================================================= */

    if (
        localUrl
    ) {

        try {

            video.src =
                localUrl;

            video.load();


            await video.play();


            /*
             * Make sure this is still
             * the current selected track.
             */

            if (
                attempt !==
                videoAttemptId
            ) {

                return;

            }


            videoError.hidden =
                true;


            updatePlayButton();

            createPlaylist(
                search.value
            );


            return;

        }

        catch (error) {

            console.warn(
                "Local video failed:",
                localUrl,
                error
            );

        }

    }


    /* =================================================
       TRY CLOUDINARY VIDEO
    ================================================= */

    if (
        cloudinaryUrl
    ) {

        try {

            video.src =
                cloudinaryUrl;

            video.load();


            await video.play();


            if (
                attempt !==
                videoAttemptId
            ) {

                return;

            }


            videoError.hidden =
                true;


            updatePlayButton();

            createPlaylist(
                search.value
            );


            return;

        }

        catch (error) {

            console.warn(
                "Cloudinary video failed:",
                cloudinaryUrl,
                error
            );

        }

    }


    /* =================================================
       BOTH FAILED
    ================================================= */

    videoError.hidden =
        false;


    updatePlayButton();

}


/* =====================================================
   PAUSE AUDIO
===================================================== */

function pauseAudio() {

    audio.pause();


    updatePlayButton();


    createPlaylist(
        search.value
    );

}


/* =====================================================
   PAUSE VIDEO
===================================================== */

function pauseVideo() {

    video.pause();


    updatePlayButton();


    createPlaylist(
        search.value
    );

}


/* =====================================================
   PLAY / PAUSE
===================================================== */

function playSong() {

    if (
        currentMode === "audio"
    ) {

        if (
            audio.paused
        ) {

            playAudio();

        }

        else {

            pauseAudio();

        }

    }

    else {

        if (
            video.paused
        ) {

            playVideo();

        }

        else {

            pauseVideo();

        }

    }

}


/* =====================================================
   UPDATE PLAY BUTTON
===================================================== */

function updatePlayButton() {

    const playing =
        currentMode === "audio"
            ? !audio.paused
            : !video.paused;


    if (
        playing
    ) {

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

    }

    else {

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

    }

}


/* =====================================================
   MAIN PLAY BUTTON
===================================================== */

playBtn.addEventListener(
    "click",
    () => {

        playSong();

    }
);


/* =====================================================
   AUDIO PLAY EVENT
===================================================== */

audio.addEventListener(
    "play",
    () => {

        /*
         * Online analyser only.
         */

        if (
            window.location.protocol !==
            "file:"
        ) {

            initializeAudioAnalyzer();

            resumeAudioContext();

        }


        updatePlayButton();


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

        updatePlayButton();


        createPlaylist(
            search.value
        );

    }
);


/* =====================================================
   AUDIO ENDED
=====================================================

   IMPORTANT:

   Natural end:
   → next track LOADS
   → NO autoplay

===================================================== */

audio.addEventListener(
    "ended",
    () => {

        if (
            currentMode !== "audio"
        ) {

            return;

        }


        /* =============================================
           REPEAT
        ============================================= */

        if (
            repeat
        ) {

            /*
             * Reset only.
             * Do NOT autoplay.
             */

            audio.currentTime =
                0;


            updatePlayButton();


            return;

        }


        /* =============================================
           SHUFFLE
        ============================================= */

        if (
            shuffle
        ) {

            loadRandomSongOnly();

            return;

        }


        /* =============================================
           NORMAL NEXT
        ============================================= */

        /*
         * Load next song only.
         * Do NOT call playAudio().
         */

        loadSong(
            currentSong + 1
        );

    }
);


/* =====================================================
   AUDIO ERROR
===================================================== */

audio.addEventListener(
    "error",
    () => {

        console.error(
            "Audio file could not be loaded:",
            audio.src
        );

    }
);


/* =====================================================
   VIDEO PLAY EVENT
===================================================== */

video.addEventListener(
    "play",
    () => {

        /*
         * Never allow audio and video
         * to play simultaneously.
         */

        audio.pause();


        updatePlayButton();


        createPlaylist(
            search.value
        );

    }
);


/* =====================================================
   VIDEO PAUSE EVENT
===================================================== */

video.addEventListener(
    "pause",
    () => {

        updatePlayButton();


        createPlaylist(
            search.value
        );

    }
);


/* =====================================================
   VIDEO ENDED
=====================================================

   IMPORTANT:

   Natural end:
   → next video LOADS
   → NO autoplay

===================================================== */

video.addEventListener(
    "ended",
    () => {

        if (
            currentMode !== "visual"
        ) {

            return;

        }


        /* =============================================
           REPEAT
        ============================================= */

        if (
            repeat
        ) {

            /*
             * Reset only.
             * Do NOT autoplay.
             */

            video.currentTime =
                0;


            updatePlayButton();


            return;

        }


        /* =============================================
           SHUFFLE
        ============================================= */

        if (
            shuffle
        ) {

            loadRandomSongOnly();

            return;

        }


        /* =============================================
           NORMAL NEXT
        ============================================= */

        /*
         * Load next video only.
         * Do NOT call playVideo().
         */

        loadSong(
            currentSong + 1
        );

    }
);


/* =====================================================
   VIDEO ERROR
===================================================== */

video.addEventListener(
    "error",
    () => {

        /*
         * playVideo() handles:
         *
         * Local → Cloudinary → Error
         *
         * So we don't automatically switch
         * sources here and create duplicate
         * fallback attempts.
         */

        console.warn(
            "Video source error."
        );

    }
);


/* =====================================================
   NEXT BUTTON
=====================================================

   Manual user action:
   → load next
   → PLAY immediately
===================================================== */

nextBtn.addEventListener(
    "click",
    () => {

        if (
            shuffle
        ) {

            loadRandomSongOnly();

            playCurrent();

            return;

        }


        loadSong(
            currentSong + 1
        );


        playCurrent();

    }
);


/* =====================================================
   PREVIOUS BUTTON
===================================================== */

previousBtn.addEventListener(
    "click",
    () => {

        loadSong(
            currentSong - 1
        );


        /*
         * Manual user action,
         * so play immediately.
         */

        playCurrent();

    }
);


/* =====================================================
   BACK 10 SECONDS
===================================================== */

backBtn.addEventListener(
    "click",
    () => {

        const player =
            currentMode === "audio"
                ? audio
                : video;


        player.currentTime =
            Math.max(
                0,
                player.currentTime - 10
            );

    }
);


/* =====================================================
   FORWARD 10 SECONDS
===================================================== */

forwardBtn.addEventListener(
    "click",
    () => {

        const player =
            currentMode === "audio"
                ? audio
                : video;


        if (
            !isFinite(
                player.duration
            )
        ) {

            return;

        }


        player.currentTime =
            Math.min(
                player.duration,
                player.currentTime + 10
            );

    }
);


/* =====================================================
   LOAD RANDOM SONG ONLY
=====================================================

   IMPORTANT:
   Used only when a track naturally ends
   while Shuffle is ON.

   It loads a random track.
   It does NOT autoplay.

===================================================== */

function loadRandomSongOnly() {

    if (
        songs.length <= 1
    ) {

        return;

    }


    let randomIndex;


    do {

        randomIndex =
            Math.floor(
                Math.random() *
                songs.length
            );

    }
    while (
        randomIndex === currentSong
    );


    /*
     * Only load.
     * No playCurrent().
     */

    loadSong(
        randomIndex
    );

}


/* =====================================================
   PROGRESS UPDATE
===================================================== */

function updateProgress(
    time,
    total
) {

    if (
        !isFinite(total) ||
        total <= 0
    ) {

        return;

    }


    const percent =
        Math.max(
            0,
            Math.min(
                100,
                (time / total) * 100
            )
        );


    progressBar.style.width =
        `${percent}%`;


    progressThumb.style.left =
        `${percent}%`;


    currentTime.textContent =
        formatTime(
            time
        );

}


/* =====================================================
   AUDIO PROGRESS
===================================================== */

audio.addEventListener(
    "timeupdate",
    () => {

        if (
            currentMode !== "audio" ||
            isDragging
        ) {

            return;

        }


        updateProgress(
            audio.currentTime,
            audio.duration
        );

    }
);


/* =====================================================
   VIDEO PROGRESS
===================================================== */

video.addEventListener(
    "timeupdate",
    () => {

        if (
            currentMode !== "visual" ||
            isDragging
        ) {

            return;

        }


        updateProgress(
            video.currentTime,
            video.duration
        );

    }
);


/* =====================================================
   AUDIO METADATA
===================================================== */

audio.addEventListener(
    "loadedmetadata",
    () => {

        if (
            currentMode !== "audio"
        ) {

            return;

        }


        duration.textContent =
            formatTime(
                audio.duration
            );

    }
);


/* =====================================================
   VIDEO METADATA
===================================================== */

video.addEventListener(
    "loadedmetadata",
    () => {

        if (
            currentMode !== "visual"
        ) {

            return;

        }


        duration.textContent =
            formatTime(
                video.duration
            );

    }
);


/* =====================================================
   SEEK FROM POINTER
===================================================== */

function seekFromPointer(
    clientX
) {

    const player =
        currentMode === "audio"
            ? audio
            : video;


    if (
        !isFinite(
            player.duration
        ) ||
        player.duration <= 0
    ) {

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
        player.duration;


    player.currentTime =
        newTime;


    updateProgress(
        newTime,
        player.duration
    );

}


/* =====================================================
   MOUSE SEEK
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

        if (
            !isDragging
        ) {

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

        isDragging =
            false;


        progressTrack.classList.remove(
            "dragging"
        );

    }
);


/* =====================================================
   TOUCH SEEK
===================================================== */

progressTrack.addEventListener(
    "touchstart",
    event => {

        isDragging =
            true;


        progressTrack.classList.add(
            "dragging"
        );


        if (
            event.touches.length
        ) {

            seekFromPointer(
                event.touches[0].clientX
            );

        }

    },
    {
        passive: true
    }
);


document.addEventListener(
    "touchmove",
    event => {

        if (
            !isDragging ||
            !event.touches.length
        ) {

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

        isDragging =
            false;


        progressTrack.classList.remove(
            "dragging"
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
   SPEED
===================================================== */

speed.addEventListener(
    "change",
    () => {

        const rate =
            parseFloat(
                speed.value
            );


        audio.playbackRate =
            rate;


        video.playbackRate =
            rate;

    }
);


/* =====================================================
   VOLUME
===================================================== */

volume.addEventListener(
    "input",
    () => {

        const value =
            parseFloat(
                volume.value
            );


        audio.volume =
            value;


        video.volume =
            value;


        if (
            value > 0
        ) {

            previousVolume =
                value;

        }


        if (
            volumeIcon
        ) {

            volumeIcon.innerHTML =
                value === 0
                    ? MUTE_ICON
                    : VOLUME_ICON;

        }

    }
);


/* =====================================================
   MUTE
===================================================== */

muteBtn.addEventListener(
    "click",
    () => {

        const player =
            currentMode === "audio"
                ? audio
                : video;


        if (
            player.volume > 0
        ) {

            previousVolume =
                player.volume;


            audio.volume =
                0;


            video.volume =
                0;


            volume.value =
                0;


            if (
                volumeIcon
            ) {

                volumeIcon.innerHTML =
                    MUTE_ICON;

            }

        }

        else {

            audio.volume =
                previousVolume;


            video.volume =
                previousVolume;


            volume.value =
                previousVolume;


            if (
                volumeIcon
            ) {

                volumeIcon.innerHTML =
                    VOLUME_ICON;

            }

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
   VIDEO SETTINGS
===================================================== */

video.controls =
    true;


video.preload =
    "metadata";


video.playsInline =
    true;


/* =====================================================
   INITIAL VOLUME
===================================================== */

audio.volume =
    1;


video.volume =
    1;


volume.value =
    1;


if (
    volumeIcon
) {

    volumeIcon.innerHTML =
        VOLUME_ICON;

}


/* =====================================================
   INITIALIZATION
=====================================================

   IMPORTANT:

   Visuals is the DEFAULT mode.

   Nothing automatically plays on page load.
===================================================== */

loadSong(
    0
);


setMode(
    "visual"
);


createPlaylist();


/* =====================================================
   LOCAL AUDIO METER
===================================================== */

if (
    window.location.protocol === "file:"
) {

    requestAnimationFrame(
        updateLocalMeter
    );

}
