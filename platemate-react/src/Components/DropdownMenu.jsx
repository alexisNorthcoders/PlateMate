
const weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
export const DropdownMenu = ({handleAccept}) => {
  
  return (<>
      {weekdays.map((day, index) => {
        return (
          <div onClick={()=>{handleAccept(day)}}className="flex w-full justify-between py-1 hover:bg-teal-500 cursor-pointer rounded-r-lg border-l-transparent hover:border-l-teal-950 border-l-4" key={index}>
            <h3 className="font-bold ml-1">{day}</h3>
          </div>)
      })}
   </>)}
  
