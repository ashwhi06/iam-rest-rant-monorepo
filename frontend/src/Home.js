
function Home() {
  return (
    <main>
      <h1>HOME</h1>
      <div >
        <img height="300" width="500" src="https://images.unsplash.com/photo-1490474504059-bf2db5ab2348?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Chia Fruit Shake" />
        <div>
          Photo by <a href="AUTHOR_LINK">Brenda Godinez</a> on <a href="UNSPLASH_LINK">Unsplash</a>
        </div>
      </div>
      <a href="/places">
        <button className="btn-primary">Places Page</button>
      </a>
    </main>
  );
}

export default Home;
