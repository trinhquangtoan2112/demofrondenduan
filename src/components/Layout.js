function Layout(props) {
    return (
        <>
            <span
                className='imgHero'>
            </span>

            <div className="main">
                <div className="container">
                    {props.children}
                </div>
            </div>

        </>
    )
}

export default Layout