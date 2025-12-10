// ContactUs.tsx - Simple, formatted structure
import { Link } from "react-router-dom";

export default function ContactUs() {
  return (
    <div className="contact-us-container">
        <div className='recall-header'>Contact and Information</div>
        <div className='contact-page-info'>Information from Indiska SpiceNord</div>

      {/* Structured using paragraphs and Links for formatting */}
      <div>
        <p>
          {/* First Line: Recall and Complaint */}
          <Link to="/contact/recall">**Recall**</Link>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <Link to="/complaint">**Complaint**</Link>
        </p>
        
        <p>
          {/* Second Line: FAQ and Others */}
          <Link to="/faq">**FAQ**</Link>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <Link to="/others">**Others**</Link>
        </p>
      </div>

      {/* Note: The spacing (&nbsp;) is fragile and generally not recommended
           for layout, but it ensures a visible gap without CSS. */}

    </div>
  );
}