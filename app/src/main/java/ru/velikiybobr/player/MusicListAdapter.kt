package ru.velikiybobr.player

import android.content.Context
import android.media.MediaPlayer
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.ImageView
import android.widget.TextView
import android.widget.Toast
import androidx.recyclerview.widget.RecyclerView

class MusicListAdapter(private val songs: List<SongItem>): RecyclerView.Adapter<MusicListAdapter.SongViewHolder>() {
    override fun onCreateViewHolder(
        parent: ViewGroup,
        viewType: Int
    ): SongViewHolder {
        val view = LayoutInflater.from(parent.context).inflate(R.layout.song_card, parent, false)
        return SongViewHolder(view)
    }

    override fun onBindViewHolder(
        holder: SongViewHolder,
        pos: Int
    ) {
        val song = songs[pos]

        holder.songName.text = song.title
        holder.songArtist.text = song.artist
        holder.songArtwork.setImageBitmap(song.artwork)

        holder.itemView.setOnClickListener {
            onClick(holder.itemView.context, song)
        }
    }

    override fun getItemCount(): Int {
        return songs.size
    }

    fun onClick(context: Context, song: SongItem) {

    }

    class SongViewHolder(itemView: View): RecyclerView.ViewHolder(itemView) {
        val songName: TextView = itemView.findViewById(R.id.lblSongName)
        val songArtist: TextView = itemView.findViewById(R.id.lblSongArtist)
        val songArtwork: ImageView = itemView.findViewById(R.id.imgSongArtwork)
    }
}