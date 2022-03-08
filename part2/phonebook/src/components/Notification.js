const Notification = ({notification}) => {
    if(notification === null) {
        return null
    }
    const styling = {
        color: notification.type === 'alert'? 'red': 'green',
        background:'#D4D4D4',
        fontStyle:'italic',
        fontSize:20,
        textAlign:'center',
        letterSpacing:.8,
        fontWeight:'bold',
        paddingBottom:10,
        paddingTop:10,
        border:'solid',
        marginBottom:10,
        borderRadius:5
    }
    return (
        <div style={styling}>
            {notification.message}
        </div>
    )
}


export default Notification