function Alert({ message }: { message: string }) {
  return (
    <div className="bg-red-500 text-white p-4 rounded-md mb-2">
      <p>Error: {message}</p>
    </div>
  );
}

export default Alert;
