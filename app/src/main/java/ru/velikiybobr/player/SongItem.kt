package ru.velikiybobr.player

import android.graphics.Bitmap
import android.net.Uri

data class SongItem (
    var id: Long,
    var file: String,
    var title: String,
    var artist: String,
    var baseUri: Uri,
    var artworkUri: Uri,
    var mime: String
)