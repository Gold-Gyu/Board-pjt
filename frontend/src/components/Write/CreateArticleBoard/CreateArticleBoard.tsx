import React, { useMemo, useRef, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './CreateArticleBoard.css';

const CreateArticleBoard = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState(null);
  const [plainText, setPlainText] = useState('');
  const maxTitleLength = 100;

  const quillRef = useRef<ReactQuill | null>(null);

  // const handleImageUpload = () => {
  //   const input = document.createElement('input');
  //   input.setAttribute('type', 'file');
  //   input.setAttribute('accept', 'image/*');
  //   input.click();

  //   input.onchange = async () => {
  //     const file = input.files?.[0];
  //     if (file) {
  //       const reader = new FileReader();
  //       reader.onload = (e) => {
  //         if (quillRef.current) {
  //           // quillRef.current가 null이 아닌지 확인
  //           const quill = quillRef.current.getEditor();
  //           const range = quill.getSelection(true);
  //           quill.insertEmbed(range.index, 'image', e.target?.result);
  //         }
  //       };
  //       reader.readAsDataURL(file);
  //     }
  //   };
  // };

  const modules = useMemo(() => {
    return {
      toolbar: {
        container: [
          [{ header: [1, 2, 3, 4, 5, false] }],
          ['bold', 'italic', 'underline', 'strike', 'blockquote'],
          ['image'],
        ],
        handlers: {
          // image: handleImageUpload,
        },
      },
    };
  }, []);

  const handleTitleChange = (e: any) => {
    if (e.target.value.length <= maxTitleLength) {
      setTitle(e.target.value);
    }
  };

  const handleContentChange = (value: string) => {
    setContent(value);
    // 태그를 제거한 순수 텍스트 추출
    const tempElement = document.createElement('div');
    tempElement.innerHTML = value;
    setPlainText(tempElement.innerText || tempElement.textContent || '');
  };

  const handleCategoryChange = (e: any) => {
    setCategory(e.target.value);
  };

  const handleImageChange = (e: any) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    // 여기에서 폼 데이터를 서버로 전송하는 로직을 추가하세요.
    console.log({ title, content, category, image });
  };

  return (
    <div className="table-container">
      <h1>게시글 작성하기</h1>
      <form onSubmit={handleSubmit} className="create-article-board">
        <div className="form-group">
          <input
            type="text"
            id="title"
            value={title}
            onChange={handleTitleChange}
            placeholder="제목을 입력하세요 (최대 100자)"
            required
          />
          <div className="title-length">
            {title.length} / {maxTitleLength} 글자
          </div>
        </div>
        <div className="form-group">
          {/* <label htmlFor="category">카테고리:</label> */}
          <select
            id="category"
            value={category}
            onChange={handleCategoryChange}
            required
          >
            <option value="">카테고리 선택</option>
            <option value="공지사항">공지사항</option>
            <option value="자유게시판">자유게시판</option>
            <option value="질문게시판">질문게시판</option>
          </select>
        </div>
        <div className="form-group">
          {/* <label htmlFor="content">내용:</label> */}
          <ReactQuill
            value={content}
            onChange={handleContentChange}
            theme="snow"
            placeholder="내용을 입력하세요..."
            style={{ width: '100%', height: '400px' }}
            modules={modules}
          />
        </div>

        {/* <div className="form-group">
          <label htmlFor="image">이미지 업로드:</label>
          <input type="file" id="image" onChange={handleImageChange} />
        </div> */}
        <div className="create-article-button-box">
          <button type="submit">게시하기</button>
          <button type="button" onClick={() => console.log('취소')}>
            취소하기
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateArticleBoard;
function setPlainText(arg0: string) {
  throw new Error('Function not implemented.');
}
