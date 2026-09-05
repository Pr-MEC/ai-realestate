import InquiryForm from "./Inquiry";
import "./Contact.css";

const Contact = () => {
  return (
    <div className="contact">
      <h1>Contact Us</h1>
      <p>Email: info@airealestate.com</p>
      <p>Phone: +91 9497861798</p>
      <p>Address: Kerala, India</p>

      <InquiryForm />
    </div>
  );
};

export default Contact;