package ru.velikiybobr.player

import android.Manifest
import android.content.ComponentName
import android.os.Build
import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.widget.Toast
import androidx.activity.enableEdgeToEdge
import androidx.appcompat.app.AppCompatActivity
import androidx.constraintlayout.widget.ConstraintLayout
import androidx.coordinatorlayout.widget.CoordinatorLayout
import androidx.core.content.ContextCompat
import androidx.core.view.ViewCompat
import androidx.core.view.WindowInsetsCompat
import androidx.media3.session.MediaController
import androidx.media3.session.SessionToken
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import com.google.android.material.bottomsheet.BottomSheetBehavior
import com.google.common.util.concurrent.ListenableFuture

class MainActivity : AppCompatActivity() {
    private var audioController: MediaController? = null
    private var audioControllerFuture: ListenableFuture<MediaController>? = null
    private var musicManager: MusicManager? = null

    private lateinit var bottomSheetBehavior: BottomSheetBehavior<ConstraintLayout>

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContentView(R.layout.activity_main)

        ViewCompat.setOnApplyWindowInsetsListener(findViewById(R.id.main)) { v, insets ->
            val systemBars = insets.getInsets(WindowInsetsCompat.Type.systemBars())
            v.setPadding(systemBars.left, systemBars.top, systemBars.right, systemBars.bottom)
            insets
        }

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.TIRAMISU)
            requestPermissions(arrayOf(Manifest.permission.READ_MEDIA_AUDIO), 100)
        else
            TODO()

        musicManager = MusicManager(this)

        val musicListView = findViewById<RecyclerView>(R.id.musicList)
        val musicListAdapter = MusicListAdapter(musicManager!!.musicList, musicManager!!)

        musicListView.layoutManager = LinearLayoutManager(this)
        musicListView.adapter = musicListAdapter

        initBottomPlayer()

        bottomSheetBehavior = BottomSheetBehavior.from(findViewById(R.id.bottomPlayer))
    }

    override fun onStart() {
        super.onStart()

        val sessionToken = SessionToken(
            this,
            ComponentName(this, AudioPlayerService::class.java)
        )

        audioControllerFuture = MediaController.Builder(this, sessionToken).buildAsync()
        audioControllerFuture?.addListener(
            {
                audioController = audioControllerFuture?.get()
                musicManager?.audioController = audioController
            },
            ContextCompat.getMainExecutor(this)
        )
    }

    override fun onStop() {
        audioControllerFuture?.let {
            MediaController.releaseFuture(it)
        }

        audioController = null

        super.onStop()
    }

    private fun initBottomPlayer() {


        /*bottomSheetBehavior.addBottomSheetCallback(object : BottomSheetBehavior.BottomSheetCallback() {
            override fun onStateChanged(p0: View, p1: Int) {

            }

            override fun onSlide(p0: View, p1: Float) {

            }
        })*/
    }
}