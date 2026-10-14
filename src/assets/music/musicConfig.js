/**
 * =============================================================================
 *  musicConfig — background music bed for the whole site
 * =============================================================================
 *  `bgMusicSrc` is null by default, which means no background music plays
 *  yet — same "stays silent until a real file is provided" pattern as
 *  src/data/voiceScript.js.
 *
 *  Once you have a track (see README.md in this folder for where to get
 *  one), wire it in like this:
 *
 *    import bgMusic from "./party-loop.mp3";
 *    export const bgMusicSrc = bgMusic;
 *
 *  That's it — no other file needs to change. VoiceNarrationContext picks
 *  it up automatically: it starts looping quietly (~14% volume) the moment
 *  the guest taps "Open Invitation", and automatically ducks down under
 *  every kid-voice line so the two never fight for attention.
 * =============================================================================
 */
export const bgMusicSrc = null;

export default bgMusicSrc;
