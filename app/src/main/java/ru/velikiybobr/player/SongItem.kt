package ru.velikiybobr.player

import android.graphics.Bitmap
import android.net.Uri

data class SongItem (
    var file: String,
    var title: String,
    var artist: String,
    var artwork: Bitmap,
    var baseUri: Uri,
    var mime: String
)