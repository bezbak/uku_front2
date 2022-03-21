import React, {
    ChangeEvent,
    FormEvent,
    useEffect,
    useRef,
    useState,
} from "react";
import { categoryAsync, selectCategory } from "./Category/CategorySlice";
import { searchAsync, selectSearch } from "./SearchSlice";
import { useAppDispatch, useAppSelector } from "@/app/hooks";

import Category from "./Category";
import Container from "../Container";
import PostCard from "../Post/PostCard";
import PostForm from "../Post/PostForm";
import PostList from "../Post/PostList";
import PostView from "../Post/PostView";
import { createPostAsync } from "../Post/PostSlice";
import getFormDate from "@/utils/getFormData";
import { selectCategoryId } from "@/app/mainSlice";
import { useRouter } from "next/router";

const Search = () => {
    const dispatch = useAppDispatch();
    const items = useAppSelector(selectCategory);
    const search = useAppSelector(selectSearch);
    const ref = useRef(null);
    const [page, setPage] = useState(1);
    const categoryId = useAppSelector(selectCategoryId);
    const [image, setImage] = useState<string | null>(null);
    const [file, setFile] = useState<File | null>(null);
    const rout = useRouter();

    useEffect(() => {
        dispatch(categoryAsync());
    }, []);

    useEffect(() => {
        dispatch(searchAsync({ page, category_id: categoryId }));
    }, [page, categoryId]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && search?.next) {
                    setPage(search?.next);
                }
            },
            {
                root: null,
                rootMargin: "0px",
                threshold: 1.0,
            }
        );
        if (ref && ref.current && search?.next) {
            observer.observe(ref.current);
        }
        return () => {
            ref.current ? observer.unobserve(ref.current) : undefined;
        };
    }, [search?.next, categoryId]);

    const createPost = async (text: string, images?: number[]) => {
        try {
            const { payload } = await dispatch(
                createPostAsync({
                    category: categoryId as number,
                    description: text,
                    location: 3,
                    images,
                })
            );
            if ((payload as any).is_created) {
                rout.push(`/posts/${(payload as any).publication_id}`);
            }
            setImage(null);
        } catch (error: unknown) {}
    };

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const form = getFormDate(event.currentTarget);
        createPost(form.text as string);
    };

    const handleImage = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length) {
            const [file] = event.target.files;
            setImage(URL.createObjectURL(file));
            setFile(file);
        }
    };

    return (
        <section className="search">
            <Container>
                <div className="search__inner">
                    <aside className="search__aside">
                        <h3 className="search__category">Категории</h3>
                        <Category items={items} />
                    </aside>
                    <main className="search__main">
                        {!!image && categoryId && file ? (
                            <PostView
                                defaultImage={image}
                                onClose={() => setImage(null)}
                                onSubmit={createPost}
                                defaultFile={file}
                            />
                        ) : (
                            <>
                                <header className="search__header">
                                    <h1 className="search__title">
                                        Объявления
                                    </h1>
                                </header>
                                <div className="search__body">
                                    <PostList>
                                        {search?.results.map((item) => {
                                            return (
                                                <PostCard
                                                    key={item.id}
                                                    item={item}
                                                    followEnable={false}
                                                    faveEneble={false}
                                                />
                                            );
                                        })}
                                    </PostList>
                                    <div ref={ref} />
                                </div>
                                {!!categoryId && (
                                    <div className="search__footer">
                                        <PostForm
                                            onSubmit={(event) =>
                                                handleSubmit(event)
                                            }
                                            onImage={handleImage}
                                            imageInput={true}
                                        />
                                    </div>
                                )}
                            </>
                        )}
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
                    min-height: 70vh;
                }
                .search__aside {
                    width: 20%;
                }
                .search__main {
                    width: 80%;
                }
                .search__header {
                    display: flex;
                    justify-content: space-between;
                    margin-bottom: 24px;
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

                .search__footer {
                    position: sticky;
                    z-index: 10;
                    bottom: 0;
                    right: 20px;
                    margin-top: 10px;
                    padding: 16px;
                    background: #ececec;
                }

                .post-form .post-form__button.button {
                    width: 147px;
                }

                @media all and (max-width: 960px) {
                    .search__aside {
                        width: 30%;
                    }
                }

                @media all and (max-width: 710px) {
                    .search__aside {
                        width: 40%;
                    }
                }

                @media all and (max-width: 630px) {
                    .search__aside {
                        display: none;
                    }

                    .search__main {
                        width: 100%;
                    }
                }
            `}</style>
        </section>
    );
};

export default Search;
