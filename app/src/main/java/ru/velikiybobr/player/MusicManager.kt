package ru.velikiybobr.player

import android.content.ContentUris
import android.content.Context
import android.net.Uri
import android.provider.MediaStore
import android.util.Log
import androidx.media3.session.MediaController
import androidx.media3.common.MediaItem
import androidx.media3.common.MediaMetadata
import androidx.core.net.toUri

class MusicManager {
    val musicList: MutableList<SongItem> = ArrayList()
    val musicItems: MutableList<MediaItem> = ArrayList()
    var audioController: MediaController? = null

    constructor(context: Context) {
        val collection = MediaStore.Audio.Media.EXTERNAL_CONTENT_URI

        val projection = arrayOf(
            MediaStore.Audio.Media._ID,
            MediaStore.Audio.Media.DISPLAY_NAME,
            MediaStore.Audio.Media.TITLE,
            MediaStore.Audio.Media.ARTIST,
            MediaStore.Audio.Media.MIME_TYPE
        )

        context.contentResolver.query(
            collection,
            projection,
            null,
            null,
            "${MediaStore.Audio.Media.TITLE} ASC"
        )?.use { cursor ->
            val idColumn = cursor.getColumnIndexOrThrow(MediaStore.Audio.Media._ID)
            val nameColumn = cursor.getColumnIndexOrThrow(MediaStore.Audio.Media.DISPLAY_NAME)
            val titleColumn = cursor.getColumnIndexOrThrow(MediaStore.Audio.Media.TITLE)
            val artistColumn = cursor.getColumnIndexOrThrow(MediaStore.Audio.Media.ARTIST)
            val mimeColumn = cursor.getColumnIndexOrThrow(MediaStore.Audio.Media.MIME_TYPE)

            while (cursor.moveToNext()) {
                val id = cursor.getLong(idColumn)
                val baseUri = ContentUris.withAppendedId(collection, id)

                val artworkUri = getArtworkUri(context, baseUri)

                val song = SongItem(
                    id,
                    cursor.getString(nameColumn),
                    cursor.getString(titleColumn),
                    cursor.getString(artistColumn),
                    baseUri,
                    artworkUri,
                    cursor.getString(mimeColumn)
                )

                musicList += song
                musicItems += buildMediaItem(song)
            }
        }
    }

    fun getArtworkUri(context: Context, baseUri: Uri): Uri {
        val contentUri = baseUri.buildUpon()
            .appendPath("albumart")
            .build()

        Log.d("huj", contentUri.toString())

        try {
            val d = context.contentResolver.openAssetFileDescriptor(contentUri, "r")
            d?.close()
            return contentUri
        } catch (e: Exception) {
            return "android.resource://ru.velikiybobr.player/${R.drawable.dummy_artwork}".toUri()
        }
    }

    fun buildMediaItem(song: SongItem): MediaItem {
        return MediaItem.Builder()
            .setUri(song.baseUri)
            .setMediaMetadata(
                MediaMetadata.Builder()
                    .setTitle(song.title)
                    .setArtist(song.artist)
                    .setArtworkUri(song.artworkUri)
                    .build()
            )
            .build()
    }

    fun play(index: Int) {
        audioController?.repeatMode = MediaController.REPEAT_MODE_ALL
        audioController?.apply {
            setMediaItems(musicItems)
            seekTo(index, 0)
            prepare()
            play()
        }
    }
}