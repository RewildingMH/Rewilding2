import React from 'react'
import emailjs from 'emailjs-com';

export const MailValidate = () => {
    const frmContact = { userEmail: "", concernCategory:"prueba", emailTitle:"titulo mail", emailDetails:""};
    const [contact,setContact] = useState(frmContact);
    const [showMessage, setShowMessage] = useState(false);
    const handleChange = e => { 
         const {name,value} = e.target;
         setContact({...contact,[name]:value}); 
    };
    const handleSubmit = e =>{
         e.preventDefault();   
         emailjs.send('default_service',
     'template_a22zow5', contact, 'user_x7aY7KK1uBGFYX9rrZ2M5')
         .then((response) => {
                    console.log('SUCCESS!', response.status, response.text);
                    setContact(frmContact);
                    setShowMessage(true);
         }, (err) => {
                    console.log('FAILED...', err);
         });
    }
   return (
     <>
     <div className="container pt-2 text-center">
         <div className="alert alert-light" role="alert">
           <a href="https://tupaginaonline.net/tutorial-para-enviar-correo-con-react-js-hooks-y-emailjs">Tutorial para enviar correo con React.js (Hooks) y emailJS</a>
         </div>
 
         { showMessage ? <div className="alert alert-success col-md-5 mx-auto" role="alert">Email Send Success!!</div> : ``}
 
         <form onSubmit={handleSubmit}>
               <div className="pt-3"><h3 className="font-weight-bold"> Recuperá tu contraseña!! </h3></div>
               <div className="pt-3 col-md-5 mx-auto">
                     <div className="form-group text-left"> <b>Your Email</b> <br/>
                         <input required type="text" value={contact.userEmail} name="userEmail" onChange={handleChange} className="form-control" placeholder="Your email" />
                     </div>
               </div>           
               <div className="pt-3 col-md-5 mx-auto text-left">
                     <button className="btn btn-primary">Submit</button>
               </div> 
         </form>
         <div className="pt-5 font-weight-bold">tupaginaonline.net</div>		
     </div>
   </>
   );
}
