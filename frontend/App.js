export default {
    /*html*/
    template: `
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
      <div class="container-fluid">
        <div class="collapse navbar-collapse" id="navbarTogglerDemo02">
          <div class="navbar-logo">
            <span class="logo">K-K</span>
          </div>
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <a class="navbar-brand" href="#">Music</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
            <li class="nav-item">
              <router-link class="nav-link" to="/artists">Artists</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/songs">Songs</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/genres">Genres</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/albums">Albums</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/artistsongs">ArtistSongs</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/songalbums">SongAlbums</router-link>
            </li>
          </ul>
          <form class="d-flex" role="search">
            <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
            <button class="btn btn-outline-success" type="submit">Search</button>
          </form>
        </div>
      </div>
    </nav> 
    <router-view></router-view>
    `
}