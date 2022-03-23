import { selectSearchUsers, userSearchAsync } from "../SearchSlice";
import { useAppDispatch, useAppSelector } from "@/app/hooks";

import Avatar from "@/components/Avatar";
import Link from "next/link";
import React from "react";
import { useEffect } from "react";

export default function Accounts({ params }: { params: string | null }) {
    const users = useAppSelector(selectSearchUsers);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(userSearchAsync());
    }, []);

    useEffect(() => {
        if (params !== null)
            dispatch(
                userSearchAsync({
                    q: params,
                })
            );
    }, [params]);

    return (
        <div className="search-accounts">
            {users?.results.map((user) => {
                return (
                    <Link href={`/profile/${user.id}`} key={user.id}>
                        <div className="search-accounts__account">
                            <Avatar name={user.first_name} url={user.avatar} />
                            <div className="search-accounts__info">
                                <h2 className="search-accounts__title">
                                    {user.first_name} {user.last_name}
                                </h2>
                                <p className="search-accounts__phone">
                                    {user.phone}
                                </p>
                            </div>
                        </div>
                    </Link>
                );
            })}
            <style jsx>{`
                .search-accounts__account {
                    display: flex;
                    column-gap: 10px;
                    padding: 10px;
                    border-bottom: 1px solid #eee;
                    cursor: pointer;
                }

                .search-accounts__title {
                    font-size: 13px;
                    margin-bottom: 7px;
                    color: #2d2727;
                    font-weight: 400;
                }

                .search-accounts__phone {
                    font-size: 10px;
                    color: #5a5a5a;
                }
            `}</style>
        </div>
    );
}
