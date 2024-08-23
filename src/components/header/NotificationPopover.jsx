import {Popover} from "react-bootstrap";

export function NotificationPopover({notifications}) {

    const unread = notifications.filter(item => !item.read);
    const read = notifications.filter(item => item.read);

    return (
        <Popover id="popover-basic">
            <Popover.Body>
                {notifications.length > 0 ? (
                    <>
                        {unread.length > 0 && (
                            <>
                                <b>Unread:</b>
                                {unread.map(item => (
                                    <div className={'notification-container mb-3'} key={item._id}>
                                        <h5>{item.title}</h5>
                                        <hr />
                                        <p>{item.message}</p>
                                    </div>
                                ))}
                            </>
                        )}

                        {read.length > 0 && (
                            <>
                                <b>Recently read:</b>
                                {read.map(item => (
                                    <div className={'notification-container mb-3'} key={item._id}>
                                        <h5>{item.title}</h5>
                                        <hr />
                                        <p>{item.message}</p>
                                    </div>
                                ))}
                            </>
                        )}
                    </>
                ) : (
                    <p>You have no notifications</p>
                )}
            </Popover.Body>
        </Popover>
    )
}