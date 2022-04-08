import React, { useEffect } from 'react';


export default function Layout({ title, pageTitle, children }) {
    useEffect(() => {
        document.title = title;
    }, [title])

    return (
        <React.Fragment>
            <div className="content">
                {children}
            </div>
        </React.Fragment>
    )
}
