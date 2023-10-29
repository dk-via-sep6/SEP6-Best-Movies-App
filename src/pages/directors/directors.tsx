import Sidebar from "../../components/sidebar/sidebar";
import Topbar from "../../components/topbar/topbar";
import "../globalStyle.css";
const DirectorsPage: React.FC = () => {
  return (
    <div className="pageContainer">
      <Topbar />
      <div className="pageContent">
        <Sidebar />
      </div>
    </div>
  );
};
export default DirectorsPage;
