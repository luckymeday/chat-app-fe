// import React from "react";
// import axios from "axios";

// export default function App() {
//   const handleUpload = async (e) => {
//     e.preventDefault();
//     const file = e.target.upload.files[0];
//     if (!file) return;
//     const form = new FormData();
//     form.append("file", file);
//     form.append("upload_preset", process.env.REACT_APP_CLOUDINARY_PRESET);
//     const res = await axios.post(
//       "https://api.cloudinary.com/v1_1/ddvtfamv3/upload",
//       form
//     );
//     console.log(res.data);
//   };

//   //

//   return (
//     <div>
//       <form onSubmit={handleUpload}>
//         <input type="file" name="upload" />
//         <input type="text" name="title" />
//         <input type="submit" value="upload" />
//       </form>
//     </div>
//   );
// }
