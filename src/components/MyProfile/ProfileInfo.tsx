import React, { useCallback, useState } from "react";

import Avatar from "../Avatar";
import Button from "../Buttons/Button";
import Icon from "../Icon";
import ImageViewer from "react-simple-image-viewer";
import InstagramIcon from "../icons/InstagramIcon";
import { IprofileInfo } from "@/services/types";
import TelagramIcon from "../icons/TelegramIcon";
import WhatsAppIcon from "../icons/WhatsAppIcon";
import { selectFollowStatus } from "../Post/PostSlice";
import { useAppSelector } from "@/app/hooks";

export interface IProfileInfoProps {
    info: IprofileInfo | null;
    onEdit: () => void;
    page: "my" | "user";
    follow?: boolean;
}

export default function ProfileInfo({
    info,
    onEdit,
    page,
    follow,
}: IProfileInfoProps) {
    const followStatus = useAppSelector(selectFollowStatus);
    const [currentImage, setCurrentImage] = useState(0);
    const [isViewerOpen, setIsViewerOpen] = useState(false);

    const openImageViewer = useCallback((index) => {
        setCurrentImage(index);
        setIsViewerOpen(true);
    }, []);

    const closeImageViewer = () => {
        setCurrentImage(0);
        setIsViewerOpen(false);
    };

    return (
        <div className="profile-info">
            <div
                className="profile-info__header"
                onClick={() => openImageViewer(0)}
            >
                <Avatar
                    width={140}
                    height={140}
                    url={info?.avatar}
                    border={true}
                    placholderSize={60}
                    name={info?.first_name || ""}
                />
            </div>
            <div className="profile-info__content">
                <h4 className="profile-info__name">
                    {info?.first_name} {info?.last_name}
                </h4>
                {/* <span className="profile-info__info">
                    {info?.gender} {info && ageToString(info?.age)}
                </span> */}
            </div>
            <div className="profile-info__static">
                <div>
                    <div className="profile-info__static-title">Подписчики</div>
                    <div className="profile-info__static-desc">
                        {info?.followers_count}
                    </div>
                </div>
                <div>
                    <div className="profile-info__static-title">Подписки</div>
                    <div className="profile-info__static-desc">
                        {info?.following_count}
                    </div>
                </div>
                <div>
                    <div className="profile-info__static-title">Публикации</div>
                    <div className="profile-info__static-desc">
                        {info?.publications_count}
                    </div>
                </div>
            </div>
            <div>
                <Button
                    type="button"
                    onClick={onEdit}
                    buttonColor={follow ? "#24475A" : undefined}
                    loading={followStatus === "loading"}
                >
                    {page === "my"
                        ? "Редактировать"
                        : follow
                        ? "Вы подписаны"
                        : "Подписаться"}
                </Button>
            </div>
            <div className="profile-info__contact">
                {!!info && (
                    <div className="profile-info__icons">
                        <a
                            href={`http://t.me/${info.telegram}`}
                            type="button"
                            className="profile-info__social"
                            target="_blank"
                            rel="noreferrer"
                            style={{
                                backgroundColor: "#039BE5",
                            }}
                        >
                            <Icon width={29} height={29}>
                                <TelagramIcon />
                            </Icon>
                        </a>
                        <a
                            href={`https://wa.me/${
                                info.whatsapp
                                    ? info.whatsapp?.split(" ").join("")
                                    : info.phone
                            }`}
                            type="button"
                            className="profile-info__social"
                            target="_blank"
                            rel="noreferrer"
                            style={{
                                backgroundColor: "#1BD741",
                            }}
                        >
                            <Icon width={29} height={29}>
                                <WhatsAppIcon />
                            </Icon>
                        </a>
                        <a
                            href={`https://instagram.com/${info.instagram}`}
                            type="button"
                            className="profile-info__social"
                            target="_blank"
                            rel="noreferrer"
                            style={{
                                backgroundColor: "#B06DB5",
                            }}
                        >
                            <Icon width={29} height={29}>
                                <InstagramIcon />
                            </Icon>
                        </a>
                    </div>
                )}
                <a href={`tel:${info?.phone}`} className="profile-info__tel">
                    {info?.phone}
                </a>
            </div>

            {isViewerOpen && info && info.avatar && (
                <ImageViewer
                    src={[info.avatar]}
                    currentIndex={currentImage}
                    disableScroll={false}
                    closeOnClickOutside={true}
                    onClose={closeImageViewer}
                />
            )}

            <style jsx>{`
                .profile-info {
                    text-align: center;
                }
                .profile-info__name {
                    font-weight: 500;
                    font-size: 18px;
                    margin: 12px 0 6px;
                }

                .profile-info__info {
                    color: #495360;
                }

                .profile-info__static {
                    padding: 12px 0;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 20px;
                    border: 1px solid #f0f0f0;
                    border-radius: 6px;
                    margin: 12px 0 24px;
                    flex-wrap: wrap;
                }

                .profile-info__static-title {
                    font-size: 14px;
                    color: #7e7e7e;
                }

                .profile-info__static-desc {
                    font-size: 14px;
                    margin-top: 12px;
                }

                .profile-info__header {
                    position: relative;
                }

                .profile-info__edit {
                    background: #ffffff;
                    border: 2px solid #d4d4d4;
                    border-radius: 50%;
                    width: 44px;
                    height: 44px;
                    position: absolute;
                    bottom: 0px;
                    right: 80px;
                    cursor: pointer;
                }

                .profile-info__icons {
                    display: flex;
                    column-gap: 12px;
                }

                .profile-info__contact {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    margin-top: 12px;
                }

                .profile-info__social {
                    background: #039be5;
                    border-radius: 6px;
                    width: 42px;
                    height: 42px;
                    border: none;
                    color: #fff;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .profile-info__tel {
                    color: #000;
                    text-decoration: none;
                }
            `}</style>
            <style jsx global>{`
                body .react-simple-image-viewer__modal {
                    z-index: 1000;
                }
            `}</style>
        </div>
    );
}
