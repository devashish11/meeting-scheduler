import React, { useState } from 'react';
import './index.css';
import IconText from './components/IconText';
import swal from 'sweetalert';
import SuccessModal from './components/SuccessModal';
const Meeting = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [description, setDescription] = useState('');
  const [guests, setGuests] = useState([]);
  const [openModal, setOpenModal] = useState(false);

  const handleAddGuestClick = (type) => {
    if (name.trim().length === 0) {
      return swal("Name field is required", '', "error");
    }
    if (email.trim().length === 0) {
      return swal("Email field is required", '', "error");
    }
    const tempArr = [...guests];
    let obj = {};
    obj.name = name;
    obj.email = email;
    tempArr.push(obj);
    setGuests(tempArr);
    setEmail('');
    setName('');
    setDescription('');
    if(type==='schedule'){
      setOpenModal(true);
    }
  }

  const handleTrashClick = (guestIndex) => {
    const tempArr = [...guests];
    let filterData = tempArr.filter((item, index) => index !== guestIndex);
    setGuests(filterData);
  }

  return (
    <>
   { openModal&&<SuccessModal openModal={openModal} setOpenModal={setOpenModal} guests={guests} description={description} setGuests={setGuests}/>}
    <div className="container">
      <div className="row containerRow">
        <div className="col col-md-5 col-lg-5 col-xl-5 pt-4 leftColumn">
          <p className='m-0 schedulerName'>Gaurav Garg</p>
          <h2>15 Minute Meeting</h2>
          <IconText icon="bi bi-clock-fill" text="15 min" />
          <IconText icon="bi bi-calendar" text="9:30am - 9:45am, Friday, September 16, 2022" />
          <IconText icon="bi bi-globe-asia-australia" text="India Standard Time" />
        </div>
        <div className='px-0 verticalLine' />
        <div className="col-md-6 col-lg-6 col-xl-6 pt-4 rightColumn">
          <h5 className='m-0'>Enter Details</h5>
          <div className="mb-3 mt-3">
            <label htmlFor="exampleFormControlInput1" className="form-label nameLabel">Name *</label>
            <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="John Doe" value={name} onChange={(e) => setName(e.target.value)} />
            <label htmlFor="exampleFormControlInput1" className="form-label mt-3 emailLabel">Email *</label>
            <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="name@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className='row'>
            <div className='col'>
              <button type="button" className="btn btn-light addGuestBtn" onClick={() => handleAddGuestClick('addguest')}>Add Guests</button>
            </div>
            <div className='entryDeleteDiv'>
              {
                guests.length > 0 && guests.map((data, index) => (
                  <div className='col col-xs-6 col-sm-6 col-md-5 col-lg-3 col-xl-3 entryDeleteCol' key={index}>
                    <p className='mb-0'>
                      {data.name}
                    </p>
                    <i className="bi bi-trash trashIcon" onClick={() => handleTrashClick(index)}></i>
                  </div>
                ))
              }
            </div>
          </div>
          <div className="my-3">
            <label htmlFor="exampleFormControlTextarea1" className="form-label textAreaLabel">Please share anything that will help prepare for our meeting.</label>
            <textarea className="form-control" id="exampleFormControlTextarea1" rows="3" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
          </div>
          <button type="button" className="btn btn-primary scheduleBtn mt-5" onClick={() => handleAddGuestClick('schedule')}>Schedule Event</button>
        </div>
      </div>
    </div>
    </>
  )
};
export default Meeting;