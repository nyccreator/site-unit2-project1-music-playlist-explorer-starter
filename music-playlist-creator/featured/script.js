let displayFeatured = (playlist) => {
	let playlistInfo = document.querySelector("#playlist-info");

	let playlistImg = document.querySelector("#playlist-img");
	playlistImg.src = `${playlist.playlist_art}`;

	let playlistTitle = document.querySelector("#playlist-title");
	playlistTitle.textContent = `${playlist.playlist_name}`;

	playlistInfo.appendChild(playlistImg);
	playlistInfo.appendChild(playlistTitle);

	let playlistSongs = document.querySelector("#playlist-songs");

	for (song of playlist.songs) {
		let playlistSong = document.createElement("div");
		playlistSong.classList.add("song-card");

		let songImg = document.createElement("img");
		songImg.classList.add("song-img");
		songImg.src = `${song.cover_art}`;

		let songInfo = document.createElement("div");
		songInfo.classList.add("song-info");

		let songTitle = document.createElement("p");
		songTitle.classList.add("song-title");
		songTitle.textContent = song.title;

		let artistName = document.createElement("p");
		artistName.textContent = song.artist;

		let albumName = document.createElement("p");
		albumName.textContent = song.album;

		let duration = document.createElement("p");
		duration.textContent = song.duration;

		songInfo.appendChild(songTitle);
		songInfo.appendChild(artistName);
		songInfo.appendChild(albumName);
		songInfo.appendChild(duration);

		playlistSong.appendChild(songImg);
		playlistSong.appendChild(songInfo);

		playlistSongs.append(playlistSong);
	}
};

let selectRandomPlaylist = (playlists) => {
	let index = Math.floor(Math.random() * playlists.length);
	return playlists[index];
};

displayFeatured(selectRandomPlaylist(data.playlists));
