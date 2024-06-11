let shuffle = (arr) => {
	for (let i = 0; i < arr.length; i++) {
		let j = Math.floor(Math.random() * arr.length);
		[arr[i], arr[j]] = [arr[j], arr[i]];
	}
};

let createModal = (playlist) => {
	let modalOverlay = document.createElement("div");
	modalOverlay.classList.add("modal-overlay");
	modalOverlay.classList.add(`${playlist.playlistID}`);
	modalOverlay.style.display = "block";

	let modalContent = document.createElement("div");
	modalContent.classList.add("modal-content");

	let modalImg = document.createElement("img");
	modalImg.classList.add("modal-img");
	modalImg.src = `${playlist.playlist_art}`;

	let separator = document.createElement("div");
	separator.classList.add("separator");

	let modalHeaderInfo = document.createElement("div");
	modalHeaderInfo.classList.add("modal-header-info");

	let modalClose = document.createElement("img");
	modalClose.classList.add("modal-close");
	modalClose.src = "./assets/img/close.png";

	modalClose.addEventListener("click", () => {
		modalOverlay.remove();
	});

	separator.appendChild(modalHeaderInfo);
	separator.appendChild(modalClose);

	let playlistTitleModal = document.createElement("h1");
	playlistTitleModal.textContent = playlist.playlist_name;

	let creatorNameModal = document.createElement("h2");
	creatorNameModal.textContent = playlist.playlist_creator;

	modalHeaderInfo.appendChild(playlistTitleModal);
	modalHeaderInfo.appendChild(creatorNameModal);

	let modalHeader = document.createElement("div");
	modalHeader.classList.add("modal-header");

	modalHeader.appendChild(modalImg);
	modalHeader.appendChild(separator);

	let shuffleBtn = document.createElement("button");
	shuffleBtn.textContent = "Shuffle";
	shuffleBtn.classList.add("shuffle-btn");

	shuffleBtn.addEventListener("click", () => {
		shuffle(playlist.songs);
		let modal = document.querySelector(".modal-overlay");
		if (modal) {
			modal.remove();
		}
		createModal(playlist);
	});

	let modalSongs = document.createElement("div");
	modalSongs.classList.add("modal-songs");

	for (song of playlist.songs) {
		let modalSong = document.createElement("div");
		modalSong.classList.add("modal-song");

		let songImg = document.createElement("img");
		songImg.classList.add("song-img");
		songImg.src = `${song.cover_art}`;

		let modalSongInfo = document.createElement("div");
		modalSongInfo.classList.add("modal-song-info");

		let songTitle = document.createElement("p");
		songTitle.textContent = song.title;

		let artistName = document.createElement("p");
		artistName.textContent = song.artist;

		let albumName = document.createElement("p");
		albumName.textContent = song.album;

		let modalDurationContainer = document.createElement("div");
		modalDurationContainer.classList.add("modal-duration-container");

		let duration = document.createElement("p");
		duration.textContent = song.duration;

		modalDurationContainer.appendChild(duration);

		modalSongInfo.appendChild(songTitle);
		modalSongInfo.appendChild(artistName);
		modalSongInfo.appendChild(albumName);

		modalSong.appendChild(songImg);
		modalSong.appendChild(modalSongInfo);
		modalSong.appendChild(modalDurationContainer);

		modalSongs.append(modalSong);
	}

	modalContent.append(modalHeader);
	modalContent.append(shuffleBtn);
	modalContent.append(modalSongs);

	modalOverlay.append(modalContent);

	document.body.appendChild(modalOverlay);
};

let createPlaylistCards = (playlists) => {
	let playlistCards = document.querySelector("#playlist-cards");
	for (playlist of playlists) {
		let card = document.createElement("div");
		card.classList.add("card");
		card.classList.add(`${playlist.playlistID}`);

		let playlistImg = document.createElement("img");
		playlistImg.src = playlist.playlist_art;
		playlistImg.classList.add("playlist-img");

		let cardInfo = document.createElement("div");
		cardInfo.classList.add("card-info");

		let playlistTitle = document.createElement("p");
		playlistTitle.textContent = playlist.playlist_name;
		playlistTitle.classList.add("playlist-title");
		playlistTitle.style.fontWeight = "bold";

		playlistImg.addEventListener("click", () => {
			let modal = document.querySelector(".modal-overlay");
			if (modal) {
				modal.remove();
			}
			createModal(playlists[card.classList[1]]);
		});

		playlistTitle.addEventListener("click", () => {
			let modal = document.querySelector(".modal-overlay");
			if (modal) {
				modal.remove();
			}
			createModal(playlists[card.classList[1]]);
		});

		let creatorName = document.createElement("p");
		creatorName.textContent = playlist.playlist_creator;

		let likeContainer = document.createElement("div");
		likeContainer.classList.add("like-container");

		let likeHeart = document.createElement("img");
		likeHeart.src = "./assets/img/empty-heart.png";
		likeHeart.classList.add("like-heart", `${playlist.playlistID}`);

		let likeCounter = document.createElement("p");
		likeCounter.textContent = `${playlist.likeCount}`;

		likeHeart.addEventListener("mouseover", () => {
			if (likeHeart.classList.contains("clicked")) {
				likeHeart.src = "./assets/img/empty-heart.png";
			} else {
				likeHeart.src = "./assets/img/full-heart.png";
			}
		});

		likeHeart.addEventListener("mouseout", () => {
			if (likeHeart.classList.contains("clicked")) {
				likeHeart.src = "./assets/img/full-heart.png";
			} else {
				likeHeart.src = "./assets/img/empty-heart.png";
			}
		});

		likeHeart.addEventListener("click", () => {
			let curr = parseInt(likeCounter.textContent);
			if (likeHeart.classList.contains("clicked")) {
				likeHeart.classList.remove("clicked");
				likeHeart.src = "./assets/img/empty-heart.png";
				playlists[likeHeart.classList[1]].likeCount -= 1;
				likeCounter.textContent = curr - 1;
				// Test
				// console.log(likeHeart.classList);
				// console.log(
				// 	playlists[likeHeart.classList[1]].playlist_name +
				// 		" " +
				// 		playlists[likeHeart.classList[1]].likeCount
				// );
			} else {
				likeHeart.classList.add("clicked");
				likeHeart.src = "./assets/img/full-heart.png";
				playlists[likeHeart.classList[1]].likeCount += 1;
				likeCounter.textContent = curr + 1;
				// Test
				// console.log(likeHeart.classList);
				// console.log(
				// 	playlists[likeHeart.classList[1]].playlist_name +
				// 		" " +
				// 		playlists[likeHeart.classList[1]].likeCount
				// );
			}
		});

		likeContainer.appendChild(likeHeart);
		likeContainer.appendChild(likeCounter);

		cardInfo.appendChild(playlistTitle);
		cardInfo.appendChild(creatorName);
		cardInfo.appendChild(likeContainer);

		card.appendChild(playlistImg);
		card.appendChild(cardInfo);

		playlistCards.appendChild(card);
	}
};

createPlaylistCards(data.playlists);
