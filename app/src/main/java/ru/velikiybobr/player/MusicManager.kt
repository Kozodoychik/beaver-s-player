package ru.velikiybobr.player

import android.content.ContentUris
import android.content.Context
import android.graphics.Bitmap
import android.net.Uri
import android.os.Build
import android.provider.MediaStore
import android.util.Size
import androidx.core.content.ContextCompat
import androidx.core.content.res.ResourcesCompat
import androidx.core.graphics.drawable.toBitmap

class MusicManager {
    val musicList: MutableList<SongItem> = ArrayList()

    constructor(context: Context) {
        val dummyArtwork =
            ContextCompat.getDrawable(context, R.drawable.dummy_artwork)!!.toBitmap()

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

                var artwork: Bitmap = dummyArtwork;

                if (Build.VERSION.SDK_INT >= 29) {
                    try {
                        artwork =
                            context.contentResolver.loadThumbnail(baseUri, Size(512, 512), null)
                    }
                    catch (e: Exception) {}
                }

                musicList += SongItem(
                    cursor.getString(nameColumn),
                    cursor.getString(titleColumn),
                    cursor.getString(artistColumn),
                    artwork,
                    baseUri,
                    cursor.getString(mimeColumn)
                )
            }
        }
    }
}