import React, {
    ChangeEvent,
    FormEvent,
    useEffect,
    useRef,
    useState,
} from "react";
import { categoryAsync, selectCategory } from "./Category/CategorySlice";
import { searchAsync, selectSearch } from "./SearchSlice";
import {
    selectCategoryId,
    selectLocation,
    setAuthConfirm,
} from "@/app/mainSlice";
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
import { useGetToken } from "@/hooks/useGetToken";

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
        setPage(1);
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
        const auth = useGetToken();
        if (auth) {
            const form = getFormDate(event.currentTarget);
            createPost(form.text as string);
        } else {
            dispatch(setAuthConfirm(true));
        }
    };

    const handleImage = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length) {
            const [file] = event.target.files;
            setImage(URL.createObjectURL(file));
            setFile(file);
        }
    };

    const handleModal = () => {
        const auth = useGetToken();
        if (auth) {
            setOpenModal(true);
        } else {
            dispatch(setAuthConfirm(true));
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
                                    defaultFile={{
                                        link: image,
                                        file: file,
                                    }}
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
                                        <div
                                            ref={ref}
                                            style={{
                                                marginBottom: 40,
                                            }}
                                        />
                                        {!!categoryId && (
                                            <div className="search__footer">
                                                <form
                                                    className="search__footer__mobile"
                                                    onSubmit={handleSubmit}
                                                >
                                                    <button
                                                        type="button"
                                                        onClick={handleModal}
                                                        className="search__footer-button"
                                                    >
                                                        <svg
                                                            width="22"
                                                            height="22"
                                                            viewBox="0 0 22 22"
                                                            fill="none"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                        >
                                                            <path
                                                                d="M10.9996 7.32715V14.6535"
                                                                stroke="white"
                                                                strokeWidth="1.5"
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                            />
                                                            <path
                                                                d="M14.6663 10.9904H7.33301"
                                                                stroke="white"
                                                                strokeWidth="1.5"
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                            />
                                                            <path
                                                                fillRule="evenodd"
                                                                clipRule="evenodd"
                                                                d="M15.6857 1H6.31429C3.04762 1 1 3.31208 1 6.58516V15.4148C1 18.6879 3.0381 21 6.31429 21H15.6857C18.9619 21 21 18.6879 21 15.4148V6.58516C21 3.31208 18.9619 1 15.6857 1Z"
                                                                stroke="white"
                                                                strokeWidth="1.5"
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                            />
                                                        </svg>
                                                    </button>
                                                    <input
                                                        type="text"
                                                        placeholder="Описание объявления"
                                                        required
                                                        className="search__footer-input"
                                                        value={text}
                                                        onChange={(event) =>
                                                            setText(
                                                                event
                                                                    .currentTarget
                                                                    .value
                                                            )
                                                        }
                                                    />
                                                    <button
                                                        type="submit"
                                                        className="search__footer-button"
                                                    >
                                                        <svg
                                                            width="20"
                                                            height="20"
                                                            viewBox="0 0 20 20"
                                                            fill="none"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                        >
                                                            <path
                                                                d="M13.8554 6.12111L8.1916 11.8227L1.56064 7.74147C0.691759 7.20657 0.867871 5.88697 1.8467 5.60287L17.5022 1.04743C18.3925 0.789782 19.2156 1.62446 18.949 2.51889L14.304 18.1582C14.013 19.1369 12.7082 19.3064 12.1809 18.4325L8.1916 11.8227"
                                                                stroke="white"
                                                                strokeWidth="1.5"
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                            />
                                                        </svg>
                                                    </button>
                                                </form>
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
                                    </div>
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
                        position: absolute;
                        width: 100%;
                        z-index: 10;
                        bottom: 0;
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

                    .search__footer-button {
                        padding: 10px 12px;
                        border-radius: 6px;
                        background-color: #e56366;
                        color: #fff;
                        border: none;
                        cursor: pointer;
                    }

                    .search__body {
                        height: 100%;
                        position: relative;
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
                            background: #fff;
                            padding: 10px;
                            bottom: 10%;
                            z-index: 1;
                        }

                        .search__footer__desc {
                            display: none;
                        }

                        .search__footer__mobile {
                            display: flex;
                            column-gap: 10px;
                        }

                        .search__footer-input {
                            width: 100%;
                            padding: 5px;
                            border-radius: 5px;
                            border: 1px solid #cfc8c8;
                        }
                    }
                `}</style>
            </section>
            <CreatePostModal
                open={openModal}
                onClose={() => setOpenModal(false)}
                onSubmit={(text, images?: number[]) => createPost(text, images)}
                defaultText={text}
            />
        </>
    );
};

export default Search;
