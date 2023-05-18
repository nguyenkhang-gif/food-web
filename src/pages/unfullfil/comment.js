import React from 'react'

export const comment = () => {
  return (
    <div> <div className="" style={{ display: 'flex', flexDirection: 'row', marginBottom: '35px', backgroundColor: '#fff' }}>
    <div style={{ height: '40px', width: '40px', borderRadius: '20px', overflow: 'hidden' }}>
        <img src={require('../assets/profile.jpg')} alt="" style={{ height: '40px' }} />
    </div>
    <div style={{ flex: 1, display: 'flex', textAlign: 'left', alignItems: 'left', flexDirection: 'column', marginLeft: '10px' }}>
        <p style={{ fontSize: '20px', margin: '5px', fontWeight: '600' }}>user name</p>
        {/* sử lý vẽ ngôi sao  */}
        <div style={{ marginLeft: 5 }}>
            {allstar.map(item => {
                if (item <= 3) {
                    return (
                        <AiFillStar />
                    )
                } else {
                    return (
                        <AiOutlineStar />
                    )
                }
            })}
        </div>
        {/* end of sử lý vẽ ngôi sao  */}
        <div style={{ marginLeft: '5px' }}>
            <p>đánh giá sản phẩm </p>
        </div>
    </div>
</div></div>
  )
}
