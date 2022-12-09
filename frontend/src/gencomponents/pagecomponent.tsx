export interface PageProps {
    title: string,
    body: string,
    img: string,
    hashtag: string
}

// The HTML for a Page.
export default function Page({ title, body, img, hashtag }: PageProps) {
    let time = new Date()

    return (
        <div className="page">
            <hr className="page-divider-top"></hr>
            <div className="page-header">
                <div className="left-page-header">
                    <code>Title: {title}</code>
                    <h4>{time.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}</h4>
                    <p>{"#" + hashtag}</p>
                </div>

                <img src={img} className="page-img" referrerPolicy="no-referrer" />
            </div>

            <code>Body: {body}</code>
            <hr className="page-divider-bottom"></hr>
        </div>
    );
}