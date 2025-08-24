import { useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  Adder,
  Avatar,
  BottomSheet,
  BottomSheetHeader,
  CategoriesWrapper,
  FileItem,
  FixedButton,
  SectionWrapper,
  Table,
  UsernameWrapper,
} from "../../../../../shared/ui";

export default function BottomSheetHistory(props) {
  const navigate = useNavigate();

  const [file, setFile] = useState(null);
  const fileInputRef = useRef(null);

  const statusMap = {
    INPROGRESS: {
      extraRow: true,
      buttonText: "Відправити",
      onClick: () => {
        props.patchFileState.handlePatch(
					props.history.id,
					file,
					props.bottomSheetState.closeSheet,
					props.historyRefetch
				)
      },
    },
    COMPLETED: {
      extraRow: false,
      buttonText: "Зрозуміло",
      onClick: null,
    },
  };

  const mappedTask = statusMap[props.taskStatus] || {};

  const historyData = {
    ...(mappedTask.extraRow && {
      Користувач: (
        <div className="user-avatar">
          <Avatar diameter="20" photo={props.history?.user.photo} />
          <UsernameWrapper>{props.history?.user.username}</UsernameWrapper>
        </div>
      ),
    }),
    Завдання: props.history?.task.title,
    Предмет: props.history?.task.teacher.subject.name,
    Викладач: props.history?.task.teacher.name,
    Розробник: (
      <div className="user-avatar">
        <Avatar diameter="20" photo={props.history?.task.developer.photo} />
        <UsernameWrapper>
          {props.history?.task.developer.username}
        </UsernameWrapper>
      </div>
    ),
    Аргументи: props.history?.arguments,
  };

  const handleAdderClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  return (
    <>
      <BottomSheet bottomSheetState={props.bottomSheetState}>
        <BottomSheetHeader
          text={{
            header: "Інформація про завдання",
            footer: "Дізнатися більше інформаці про завдання",
          }}
        />
        <Table data={historyData} />
        <SectionWrapper section={{ header: "ФАЙЛ З РОЗВ’ЯЗКОМ" }}>
          <CategoriesWrapper>
            {!file && (
              <>
                <input
                  type="file"
                  ref={fileInputRef}
                  style={{ display: "none" }}
                  onChange={handleFileChange}
                />
                <Adder
                  centerText="Додати файл"
                  isVisible={true}
                  onClick={() => handleAdderClick()}
                />
              </>
            )}
            {file && (
              <FileItem
                centerData={{ header: file.name }}
                onClick={() => setFile(null)}
                isCrossVisible
              />
            )}
          </CategoriesWrapper>
        </SectionWrapper>
        <FixedButton
          text={{
            default: mappedTask.buttonText,
            loading: "Виконується запит",
          }}
          isDisabled={props.patchFileState.isLoading}
          isActive={file}
          onClick={mappedTask.onClick}
        />
      </BottomSheet>
    </>
  );
}
