package ru.velikiybobr.player

import androidx.media3.exoplayer.ExoPlayer
import androidx.media3.session.MediaSession
import androidx.media3.session.MediaSessionService

class AudioPlayerService: MediaSessionService() {
    private var player: ExoPlayer? = null
    private var session: MediaSession? = null

    override fun onCreate() {
        super.onCreate()

        player = ExoPlayer.Builder(this).build()
        session = MediaSession.Builder(this, player!!).build()
    }

    override fun onGetSession(p0: MediaSession.ControllerInfo): MediaSession? {
        return session
    }

    override fun onDestroy() {
        session?.release()
        session = null

        player?.release()
        player = null

        super.onDestroy()
    }

}