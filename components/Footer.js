const Footer = () => {
  return (
    
    <footer className="Footer">
      Samurai List &copy;{new Date().getFullYear()}

      {/* STYLE */}
      <style jsx>{`
        footer {
          border-top: 1px solid #000;
          text-align: center;
          max-width: 700px;
          margin: 30px auto;
          padding: 20px;
          color: #888888;
        }
      `}</style>
    </footer>
  );
}
 
export default Footer;