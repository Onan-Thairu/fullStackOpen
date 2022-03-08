const ErrorMessage = ({message}) => {
    if(message === null) {
        return null
    }
    const styling = {
        color:'red',
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
            {message}
        </div>
    )
}

export default ErrorMessage