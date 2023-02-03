import { useRouter } from 'next/router'


const ProposalDetail = () => {

    const router = useRouter()
    const { pid } = router.query
  
    
    return (
      <div className="">
        <h1>Proposal {pid}</h1>
        <h2>
          The peerdao is a decentralized group of data-sharing organizations data.
        </h2>
        <h2>image goes here</h2>
      </div>
    );
  };
  
  export default ProposalDetail
  