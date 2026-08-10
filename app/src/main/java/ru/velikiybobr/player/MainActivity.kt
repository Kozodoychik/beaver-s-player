package ru.velikiybobr.player

import android.Manifest
import android.os.Bundle
import androidx.activity.enableEdgeToEdge
import androidx.appcompat.app.AppCompatActivity
import androidx.core.view.ViewCompat
import androidx.core.view.WindowInsetsCompat
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView

class MainActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContentView(R.layout.activity_main)
        /*ViewCompat.setOnApplyWindowInsetsListener(findViewById(R.id.main)) { v, insets ->
            val systemBars = insets.getInsets(WindowInsetsCompat.Type.systemBars())
            v.setPadding(systemBars.left, systemBars.top, systemBars.right, systemBars.bottom)
            insets
        }*/

        requestPermissions(arrayOf(Manifest.permission.READ_MEDIA_AUDIO), 100)

        val musicManager = MusicManager(this)

        val musicListView = findViewById<RecyclerView>(R.id.musicList)
        val musicListAdapter = MusicListAdapter(musicManager.musicList)

        musicListView.layoutManager = LinearLayoutManager(this)
        musicListView.adapter = musicListAdapter

    }
}