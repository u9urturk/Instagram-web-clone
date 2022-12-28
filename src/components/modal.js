
export default function Modal({isTrue=false}) {
    
    let visibilty = "invisible"
    
    if(isTrue === true){
        visibilty = "visible"
       }
    return (


        <div className={visibilty} >
            <div className='flex items-center backdrop-brightness-50 justify-center z-40  mb-[80px] bg-white rounded-lg h-[50px] w-[50px] p-4 '>
                <h6 className='font-semibold tracking-widest text-white'  > TEST</h6>
            </div>
        </div>

    )
}
