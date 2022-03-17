import React, { useEffect } from "react";
import { categoryAsync, selectCategory } from "./Category/CategorySlice";
import { useAppDispatch, useAppSelector } from "@/app/hooks";

import Category from "./Category";
import Container from "../Container";

const Search = () => {
    const dispatch = useAppDispatch();
    const items = useAppSelector(selectCategory);

    useEffect(() => {
        dispatch(categoryAsync());
    }, []);

    return (
        <section className="search">
            <Container>
                <div className="search__inner">
                    <aside className="search__aside">
                        <h3 className="search__category">Категории</h3>
                        <Category items={items} />
                    </aside>
                    <main className="search__main">
                        <header className="search__header">
                            <h1 className="search__title">Объявления</h1>
                        </header>
                        <div className="search__body"></div>
                    </main>
                </div>
            </Container>
            <style jsx global>{`
                .search {
                    padding: 35px 0;
                }
                .search__inner {
                    display: flex;
                    column-gap: 21px;
                }
                .search__aside {
                    width: 240px;
                }
                .search__main {
                    min-height: 70vh;
                }
                .search__header {
                    display: flex;
                    justify-content: space-between;
                }
                .search__title {
                    font-weight: 500;
                }
                .search .search__button {
                    width: auto;
                }

                .search__category {
                    margin-bottom: 20px;
                }

                @media all and (max-width: 960px) {
                    .search__aside {
                        display: none;
                    }
                }
            `}</style>
        </section>
    );
};

export default Search;
