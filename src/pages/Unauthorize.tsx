import { Link } from "react-router";

export default function Unauthorize() {
    return (
        <div>
            <h1>Unauthorize Access</h1>
            <Link to="/" className="text-amber-700">Home</Link>
        </div>
    );
}