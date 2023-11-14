import { useEffect } from "react"

export default function Wallet()  {
    const [wallet, setWallet] = useState("");
    useEffect(() => {
        // Fetch user's appointments from your backend API
        handleFetch();
      },[]);
    
      const handleFetch = async () => {
        // Make an API request to fetch appointments for the patient
        const response = await fetch("http://localhost:4000/api/patient/wallet", {
        });
    
        if (response.ok) {
            setWallet(await response.json());
        } else {
            setWallet([]);
            const response = await fetch("http://localhost:4000/api/doctor/wallet",{});
            if(response.ok)
            setWallet(await response.json());
            else 
            setWallet([]);
        }
      };
    return(
        <div>
            <p>Your Wallet Amount is {wallet} EGP</p>
        </div>
    )
    }