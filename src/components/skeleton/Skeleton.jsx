import React from 'react'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import './Skeleton.css'

function SkeletonPage() {
    return (
        <SkeletonTheme baseColor='#ddd' highlightColor='lightgray'>
            <div className="skeleton_card">
                <div className="skeleton_item">
                    <div className="skeleton_item_top">
                        <Skeleton circle={true} style={{ width: "70px", height: "70px" }} />
                        <div style={{ margin: "0 10px" }}>
                            <Skeleton style={{ width: "140px", height: "10px" }} />
                            <Skeleton style={{ width: "140px", height: "10px" }} />
                            <Skeleton style={{ width: "140px", height: "10px" }} />
                        </div>
                    </div>
                    <Skeleton />
                    <Skeleton />
                    <Skeleton />
                    <Skeleton />

                </div>
                <div className="skeleton_item">
                    <div className="skeleton_item_top">
                        <Skeleton circle={true} style={{ width: "70px", height: "70px" }} />
                        <div style={{ margin: "0 10px" }}>
                            <Skeleton style={{ width: "140px", height: "10px" }} />
                            <Skeleton style={{ width: "140px", height: "10px" }} />
                            <Skeleton style={{ width: "140px", height: "10px" }} />
                        </div>
                    </div>
                    <Skeleton />
                    <Skeleton />
                    <Skeleton />
                    <Skeleton />

                </div>
                <div className="skeleton_item">
                    <div className="skeleton_item_top">
                        <Skeleton circle={true} style={{ width: "70px", height: "70px" }} />
                        <div style={{ margin: "0 10px" }}>
                            <Skeleton style={{ width: "140px", height: "10px" }} />
                            <Skeleton style={{ width: "140px", height: "10px" }} />
                            <Skeleton style={{ width: "140px", height: "10px" }} />
                        </div>
                    </div>
                    <Skeleton />
                    <Skeleton />
                    <Skeleton />
                    <Skeleton />

                </div>

                <div className="skeleton_item">
                    <div className="skeleton_item_top">
                        <Skeleton circle={true} style={{ width: "70px", height: "70px" }} />
                        <div style={{ margin: "0 10px" }}>
                            <Skeleton style={{ width: "140px", height: "10px" }} />
                            <Skeleton style={{ width: "140px", height: "10px" }} />
                            <Skeleton style={{ width: "140px", height: "10px" }} />
                        </div>
                    </div>
                    <Skeleton />
                    <Skeleton />
                    <Skeleton />
                    <Skeleton />

                </div>
                <div className="skeleton_item">
                    <div className="skeleton_item_top">
                        <Skeleton circle={true} style={{ width: "70px", height: "70px" }} />
                        <div style={{ margin: "0 10px" }}>
                            <Skeleton style={{ width: "140px", height: "10px" }} />
                            <Skeleton style={{ width: "140px", height: "10px" }} />
                            <Skeleton style={{ width: "140px", height: "10px" }} />
                        </div>
                    </div>
                    <Skeleton />
                    <Skeleton />
                    <Skeleton />
                    <Skeleton />

                </div>
                <div className="skeleton_item">
                    <div className="skeleton_item_top">
                        <Skeleton circle={true} style={{ width: "70px", height: "70px" }} />
                        <div style={{ margin: "0 10px" }}>
                            <Skeleton style={{ width: "140px", height: "10px" }} />
                            <Skeleton style={{ width: "140px", height: "10px" }} />
                            <Skeleton style={{ width: "140px", height: "10px" }} />
                        </div>
                    </div>
                    <Skeleton />
                    <Skeleton />
                    <Skeleton />
                    <Skeleton />

                </div>

            </div>
        </SkeletonTheme>
    )
}

export default SkeletonPage
