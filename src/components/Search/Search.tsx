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
import { createPostAsync } from "../Post/PostSlice";
import getFormDate from "@/utils/getFormData";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { useGetToken } from "@/hooks/useGetToken";
import CN from "classnames";
import compressFile from "@/utils/compressFile";

const injectPcodeScript = () => {
    const scriptElement = document.createElement("script");
    scriptElement.innerText = "window.yaContextCb = window.yaContextCb || []";

    document.body.appendChild(scriptElement);

    const loaderElement = document.createElement("script");
    loaderElement.src = "https://yandex.ru/ads/system/context.js";

    document.body.appendChild(loaderElement);
};

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
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        dispatch(categoryAsync());
    }, []);

    useEffect(() => {
        setPage(1);
        dispatch(
            searchAsync({
                page,
                category_id: categoryId,
                location_id: location?.id,
            })
        );
    }, [page, categoryId, location]);

    const createPost = async (text: string, images?: number[]) => {
        if (location) {
            try {
                setLoading(true);
                const { payload } = await dispatch(
                    createPostAsync({
                        category: categoryId as number,
                        description: text,
                        location: location.id,
                        images,
                    })
                );
                setLoading(false);
                setOpenModal(false);
                if ((payload as any).is_created) {
                    rout.push(`/detail/${(payload as any).publication_id}`);
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

    const handleImage = async (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length) {
            const [file] = event.target.files;
            try {
                const compressedFile = await compressFile(file);
                setImage(URL.createObjectURL(compressedFile));
                setFile(compressedFile);
            } catch (error) {
                toast.error("Что то пошло не так! попробуйте позже");
            }
        }
    };

    const handleModal = (event: ChangeEvent<HTMLInputElement>) => {
        handleImage(event);
        setOpenModal(true);
    };

    const clear = () => {
        setText("");
        setImage(null);
        setFile(null);
    };

    useEffect(() => {
        injectPcodeScript();
    }, []);

    const addAd = (id: string, page: number) => {
        window.yaContextCb.push(() => {
            window.Ya.Context.AdvManager.render({
                renderTo: `yandex_rtb_${id}`,
                blockId: "R-A-1654405-1",
                onError: function (data: any) {
                    console.log("type", data.type); // error или warning
                    console.log("code", data.code); // Код ошибки из таблицы выше
                    console.log("text", data.text); // Текстовое описание ошибки
                },
                pageNumber: page,
            });
        });
    };

    return (
        <>
            <section className="search">
                <Container>
                    <div className="search__inner">
                        <aside
                            className={CN("search__aside", {
                                "search__aside--hide": categoryId !== undefined,
                            })}
                        >
                            <h3 className="search__category">Категории</h3>
                            <Category items={items} />
                        </aside>
                        <main
                            className={CN("search__main", {
                                "search__main--show": categoryId !== undefined,
                            })}
                        >
                            <header className="search__header">
                                <h1 className="search__title">Объявления</h1>
                            </header>
                            <div className="search__body">
                                <PostList>
                                    {search?.results.map((item, index) => {
                                        if (index !== 0 && index % 10 === 0) {
                                            addAd(
                                                `R-A-1654405-1-${index / 10}`,
                                                index / 10
                                            );
                                            return (
                                                <div
                                                    key={item.id}
                                                    className="ad-block"
                                                >
                                                    <div
                                                        id={`yandex_rtb_R-A-1654405-1-${
                                                            index / 10
                                                        }`}
                                                    />
                                                </div>
                                            );
                                        } else {
                                            return (
                                                <PostCard
                                                    key={item.id}
                                                    item={item}
                                                    followEnable={
                                                        !item.is_owner
                                                    }
                                                    faveEneble={!item.is_owner}
                                                    header={!item.is_owner}
                                                />
                                            );
                                        }
                                    })}
                                </PostList>
                                <div
                                    ref={ref}
                                    style={{
                                        marginBottom: 100,
                                    }}
                                />
                                {!!categoryId && (
                                    <div className="search__footer">
                                        <PostForm
                                            onSubmit={handleSubmit}
                                            onImage={handleModal}
                                            imageInput={true}
                                            onInput={(text) => setText(text)}
                                            loading={loading}
                                        />
                                    </div>
                                )}
                            </div>
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
                        position: fixed;
                        width: 76%;
                        right: 20px;
                        z-index: 10;
                        bottom: 10%;
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
                        .search__footer {
                            width: 67%;
                        }
                    }

                    @media all and (max-width: 710px) {
                        .search__aside {
                            width: 100%;
                            margin-top: 10px;
                        }

                        .search__main {
                            width: 100%;
                            display: none;
                        }

                        .search {
                            padding: 0;
                        }

                        .search__main--show {
                            display: block;
                        }
                        .search__aside--hide {
                            display: none;
                        }
                        .search__header,
                        .search__category {
                            display: none;
                        }
                        .search__footer {
                            position: fixed;
                            left: 0;
                            width: 100%;
                            bottom: 0;
                        }
                    }

                    @media all and (max-width: 490px) {
                        .search__footer {
                            background: #fff;
                            padding: 10px;
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
                onClose={() => {
                    setOpenModal(false);
                    clear();
                }}
                onSubmit={(text, images?: number[]) => createPost(text, images)}
                defaultText={text}
                defaultImage={image}
                defaultFile={file}
            />
        </>
    );
};

export default Search;
