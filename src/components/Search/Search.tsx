import React, {
    ChangeEvent,
    FormEvent,
    useEffect,
    useRef,
    useState,
} from "react";
import { categoryAsync, selectCategory } from "./Category/CategorySlice";
import { searchAsync, selectSearch } from "./SearchSlice";
import { selectCategoryId, selectLocation } from "@/app/mainSlice";
import { useAppDispatch, useAppSelector } from "@/app/hooks";

import Category from "./Category";
import Container from "../Container";
import CreatePostModal from "../Post/CreatePostModal";
import PostCard from "../Post/PostCard";
import PostForm from "../Post/PostForm";
import PostList from "../Post/PostList";
import PostView from "../Post/PostView";
import { createPostAsync } from "../Post/PostSlice";
import getFormDate from "@/utils/getFormData";
import { toast } from "react-toastify";
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
    const location = useAppSelector(selectLocation);
    const [text, setText] = useState("");
    const [openModal, setOpenModal] = useState(false);

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
        if (location) {
            try {
                const { payload } = await dispatch(
                    createPostAsync({
                        category: categoryId as number,
                        description: text,
                        location: location.id,
                        images,
                    })
                );
                if ((payload as any).is_created) {
                    rout.push(`/posts/${(payload as any).publication_id}`);
                }
                setImage(null);
            } catch (error: unknown) {}
        } else {
            toast.error("Укажите регион");
        }
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
        <>
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
                                    defaultText={text}
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
                                                        followEnable={
                                                            !item.is_owner
                                                        }
                                                        faveEneble={
                                                            !item.is_owner
                                                        }
                                                    />
                                                );
                                            })}
                                        </PostList>
                                        <div ref={ref} />
                                    </div>
                                    {!!categoryId && (
                                        <div className="search__footer">
                                            <div className="search__footer__mobile">
                                                <button
                                                    className="search__footer__mobile-button button-reset-default-styles"
                                                    onClick={() =>
                                                        setOpenModal(!openModal)
                                                    }
                                                >
                                                    <svg
                                                        width="24"
                                                        height="24"
                                                        viewBox="0 0 24 24"
                                                        fill="none"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <path
                                                            d="M22.7999 10.8002L13.2001 10.8002V1.20017C13.2001 0.537915 12.6624 0.000244141 11.9999 0.000244141C11.3377 0.000244141 10.8 0.537915 10.8 1.20017V10.8002H1.19993C0.537671 10.8002 0 11.3379 0 12.0002C0 12.6626 0.537671 13.2003 1.19993 13.2003H10.8L10.8 22.8002C10.8 23.4626 11.3377 24.0003 11.9999 24.0003C12.6624 24.0003 13.2001 23.4626 13.2001 22.8002L13.2001 13.2003L22.7999 13.2003C23.4624 13.2003 24.0001 12.6626 24.0001 12.0002C24.0001 11.3379 23.4624 10.8002 22.7999 10.8002Z"
                                                            fill="white"
                                                        />
                                                    </svg>
                                                </button>
                                            </div>
                                            <div className="search__footer__desc">
                                                <PostForm
                                                    onSubmit={(event) =>
                                                        handleSubmit(event)
                                                    }
                                                    onImage={handleImage}
                                                    imageInput={true}
                                                    onInput={(text) =>
                                                        setText(text)
                                                    }
                                                />
                                            </div>
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

                    .search__footer__mobile {
                        display: none;
                    }

                    .search__footer__mobile-button {
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        width: 60px;
                        height: 60px;
                        background: #e56366;
                        border-radius: 53px;
                        margin-left: auto;
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

                    @media all and (max-width: 490px) {
                        .search__footer {
                            background: transparent;
                            padding: 0;
                            bottom: 10%;
                            z-index: 1;
                        }

                        .search__footer__desc {
                            display: none;
                        }

                        .search__footer__mobile {
                            display: block;
                        }
                    }
                `}</style>
            </section>
            <CreatePostModal
                open={openModal}
                onClose={() => setOpenModal(false)}
                onSubmit={(text, images?: number[]) => createPost(text, images)}
            />
        </>
    );
};

export default Search;
