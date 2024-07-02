const api_key='AIzaSyBbZfgP6IcQyYWHsH0GvzSWGpT_Xy5gEQU'
const converter=(value)=>{
    if(value>=1000000)
        {
            return Math.floor(value/1000000)+"M"
        }
        else if(value>=1000)
            {
                return Math.floor(value/1000)+"K"
            }
            else{
                return value
            }

}
export { api_key,converter}
