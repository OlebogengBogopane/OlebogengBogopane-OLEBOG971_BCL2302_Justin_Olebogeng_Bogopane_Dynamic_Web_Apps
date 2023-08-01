
export default function Navbar() {
    return (
        <nav className="nav">
            
            <a href="/" className="Site-title">Podcast Corner</a>
            <img href="/" className="logo"  src="./public/Daco_4436880.png"/>
          
            <ul >
                <li>
                    <a href="/blogs" className="blogs">Pods</a>
                    </li>
                    <li>
                    <a href="/about" className="about">About</a>
                </li>
            </ul>
        </nav>
    )
}

