import img10 from "../../assets/images/ion_documents.svg";
const Content = () => {
    return (
      <div className="grid grid-cols-3 gap-6">
      {[1, 2, 3, 4, 5, 6].map((doc) => (
        <div
          key={doc}
          className="w-[295px] h-[308px] bg-[#f6eded] rounded-[23px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]"
        >
          <div className="text-orange-500 text-5xl mb-4"><img src={img10} alt="" className="w-20 h-20 relative overflow-hidden items-center" /></div>
          <h3 className="w-15 h-15 text-center text-black text-lg font-medium">Document Title 01</h3>
          <p className="text-gray-600 text-sm">
            Horem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>
        </div>
      ))}
    </div>
    );
  };
  
  export default Content;
  