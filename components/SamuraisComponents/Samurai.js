import Link from 'next/link';

const Samurai = ({ id, name, email }) => {
  return (
    <Link href={`/samurais/${id}`}>
      <div className="samurai">
        <h3>{name}</h3>
        <p>{email}</p>

        {/* STYLE */}
        <style jsx>{`
        .samurai {
          border-bottom: 1px solid #000;
          padding: 12px 0;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        p {
          color: rgb(185, 185, 185);
        }

        .samurai:hover {
          cursor: pointer;
          opacity: 0.5;
        }
      `}</style>
      </div>
    </Link>
  );
}

export default Samurai;