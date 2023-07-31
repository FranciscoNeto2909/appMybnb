import Skeleton from 'react-loading-skeleton';
import "react-loading-skeleton/dist/skeleton.css"

export default function CardSkeleton() {
    return (
        <div className="card" style={{minHeight:"418px", width:"300px"}}>
            <div>
                <Skeleton height={300}/>
            </div>
            <div className="card-data">
                <h2 className='card-data-title'><Skeleton /></h2>
                <p className='card-data-desc'><Skeleton /></p>
                <p className='card-data-price'><Skeleton /></p>
            </div>
        </div>
    )
} 