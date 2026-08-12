package ru.velikiybobr.player

import android.content.Context
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.ImageView
import android.widget.TextView
import androidx.recyclerview.widget.RecyclerView

class MusicListAdapter(private val songs: List<SongItem>, private val musicManager: MusicManager): RecyclerView.Adapter<MusicListAdapter.SongViewHolder>() {
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
        holder.songArtwork.setImageURI(song.artworkUri)

        holder.itemView.setOnClickListener {
            onClick(holder.itemView.context, pos)
        }
    }

    override fun getItemCount(): Int {
        return songs.size
    }

    fun onClick(context: Context, index: Int) {
        musicManager.play(index)
    }

    class SongViewHolder(itemView: View): RecyclerView.ViewHolder(itemView) {
        val songName: TextView = itemView.findViewById(R.id.lblSongName)
        val songArtist: TextView = itemView.findViewById(R.id.lblSongArtist)
        val songArtwork: ImageView = itemView.findViewById(R.id.imgSongArtwork)
    }
}