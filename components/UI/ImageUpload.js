import React, { Component } from 'react';
import ReactCrop from 'react-image-crop';

// Icons
import IcUpload from 'react-icons/lib/md/add-a-photo';
import IcEdit from 'react-icons/lib/md/create';
import Lightbox from './Lightbox';
import theme from '../../config/theme';
import Button from './Button';

class ImageUpload extends Component {
  state = {
    imageBlob: null,
    imageFile: null,
    imageURL: null,
    src: null,
    isFinishedCropping: false,
    crop: {
      aspect: 1,
      height: 40.85454738528966,
      width: 50,
      x: 0,
      y: 18
    },
  }

  // =========================================================================
  //  PROFILE PICTURE FUNCTIONS
  // =========================================================================
  /**
  * GET THE ASPECT RATIO
  */
  componentDidMount() {
    const { aspectRatio } = this.props;
    if (!aspectRatio) return;
    this.setState({ crop: { ...this.state.crop, aspect: aspectRatio } });
  }

  /**
   * HANDLE FILE SELECT
   */
  onSelectFile = e => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener('load', () =>
        this.setState({ src: reader.result }),
      );
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  /**
   * HANDLE FILE CHANGE
   */
  onChangeFile = e => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener('load', () =>
        this.setState({
          src: reader.result,
          isFinishedCropping: false
        }),
      );
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  /**
   * WHEN UPLOADED IMAGE HAS LOADED
   */
  onImageLoaded = (image) => this.imageRef = image;

  /**
   * SET THE CROPPED IMAGE STATE (THIS FUNCTION RUNS WHEN THE USER STOPS DRAGGING THE CROPPER)
   */
  onCropComplete = (crop, pixelCrop) => this.makeClientCrop(crop, pixelCrop);

  onCropChange = (crop) => this.setState({ crop });

  /**
   * CROP THE IMAGE
   */
  async makeClientCrop(crop, pixelCrop) {
    if (this.imageRef && crop.width && crop.height) {
      const imageURL = await this.getCroppedImg(this.imageRef, pixelCrop, 'newFile.jpeg');
      /**
       * The 'apple' attribute was added as a bug fix to force a crop action
       * If the user didn't addust anything before pressing 'save changes'
      **/
      this.setState({ imageURL, apple: true }, () => this.sendData());
    }
  }

  /**
   * GET THE CROPPED IMAGE
   */
  getCroppedImg(image, crop, fileName) {
    const canvas = document.createElement("canvas");

    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext("2d");

    ctx.drawImage(
      image,
      crop.x,// * scaleX,
      crop.y,// * scaleY,
      crop.width, // * scaleX,
      crop.height, // * scaleY,
      0, 0,
      crop.width,
      crop.height
    );

    return new Promise((resolve) => {
      canvas.toBlob(blob => {
        if (!blob) return;

        blob.name = fileName;
        /**
         * Get the blob and convert it to a file, before the 
         * window.URL.revokeObjectURL function converts it to String
         */
        this.setState({
          imageBlob: blob,
          imageFile: new File([blob], "newFile.jpeg", { type: "image/jpeg" })
        });

        // Append the Blob to a URL
        window.URL.revokeObjectURL(this.fileUrl);
        this.fileUrl = window.URL.createObjectURL(blob);
        resolve(this.fileUrl);
      }, 'image/jpeg');
    });
  }

  /**
   * SAVE AND VIEW THE CROPPED IMAGE
   */
  saveImage = () => {
    this.setState({ isFinishedCropping: true });
    this.sendData(true);
  };

  /**
  * SEND THE PICTURE
  */
  sendData(isFinished) {
    const { onChange, onSave } = this.props;
    const { imageURL, imageFile, imageBlob } = this.state;

    if (onChange) onChange({ imageURL, imageFile, imageBlob });
    if (isFinished && onSave) onSave({ imageURL, imageFile, imageBlob });
  }

  /**
  * CANCEL IMAGE UPLOAD
  */
  cancelUpload = () => {
    const { onChange, onCancel } = this.props;

    // Reset the State
    this.setState({
      src: null,
      isFinishedCropping: false,
      imageURL: null,

      // The Crop Config
      crop: {
        aspect: 1,
        height: 40.85454738528966,
        width: 50,
        x: 0,
        y: 18
      }
    }, () => {

      // Unset the data sent to the parent component
      if (onChange) onChange({ imageFile: null, imageURL: null, imageBlob: null });
      if (onCancel) onCancel({ imageFile: null, imageURL: null, imageBlob: null });
    })
  }


  // =======================================================================
  //  RENDER
  // =======================================================================
  render() {
    const { isFinishedCropping, imageURL, src, crop } = this.state;
    const { initialImage, width, height, aspectRatioHeight } = this.props;
    let imageStyle = {
      width: width || "150px",
      height: (aspectRatioHeight)
        ? "auto"
        : height ? height
          : width ? width
            : "150px",
      padding: aspectRatioHeight ? aspectRatioHeight : "0"
    };

    // =======================================================================
    //  UI
    // =======================================================================
    return (
      <div className="ImageUpload">
        <div className="iuImage" style={imageStyle}>
          {// PROFILE PICTURE UPLOAD (DISPLAY THE CROPPED IMAGE (IF UPLOADED) OR THE UPLOAD ICON)
            (imageURL || initialImage)
              ?
              // EDIT CROPPED IMAGE 
              <div className="iuEditImage">
                <label>
                  <input
                    type="file"
                    name="profilePicture"
                    accept="image/x-png,image/gif,image/jpeg"
                    onChange={this.onChangeFile}
                  />
                  <div className="iuEditButton" > <IcEdit /> </div>
                </label>
                <img alt="Crop" src={imageURL || initialImage} />
              </div>

              :
              // UPLOAD NEW IMAGE
              <label className="iuUploadImage">
                <input
                  type="file"
                  name="profilePicture"
                  accept="image/x-png,image/gif,image/jpeg"
                  onChange={this.onSelectFile}
                />
                <div className="iuInner"> <IcUpload /> </div>
              </label>
          }
        </div>

        {/* CROP PICTURE LIGHTBOX */}
        {(src && !isFinishedCropping) &&
          <Lightbox
            show={true}
            isFixed
            autoHeight
            title="Crop Image"
            fullScreenInResponsive
            bottomActions={[
              <Button onClick={this.cancelUpload} label="Cancel" />,
              <Button filled onClick={this.saveImage} label="Save Changes" />
            ]}>

            {/* THE IMAGE BEING CROPPED */}
            <div className="cropPic">
              <ReactCrop
                src={src}
                crop={crop}
                onImageLoaded={this.onImageLoaded}
                onComplete={this.onCropComplete}
                onChange={this.onCropChange}
              />
            </div>
          </Lightbox>
        }

        { /* STYLE ======================================================================================= */}
        <style jsx>{`
          .iuImage{
            display: inline-block;
            border-radius: 5px;
            position: relative;
          }

          .iuImage input{
            display: none !important;
          }

          .iuUploadImage, .iuEditImage{
            position: absolute;
            top:0;
            left:0; 
            bottom:0;
            right:0;
          }

          /* EDIT IMAGE */
          .iuEditButton{
            position: absolute;
            top: 10px;
            left: 10px;
            background: #fff;
            padding: 7px 10px;
            padding-bottom: 10px;
            cursor: pointer;
            z-index: 1;
            border-radius: 4px;
            box-shadow: 0 2px 7px rgba(124, 103, 165, 0.4);
          }

          .iuEditImage, .iuEditImage img{
            position: absolute;
            display: block;
            top: 0;
            left: 0;
            width: 100%;
            border-radius: 4px;
            box-shadow: ${theme.boxShadows.smallShadow};
            height: 100%;
          } 

          /* UPLOAD IMAGE */
          .iuUploadImage {
            transition: background ${`linear`} 0.2s;
            cursor: pointer;
          }

          .iuInner{
            height: 100%;
            display: flex;
            align-items:center;
            justify-content: center;
            border: 2px dashed ${theme.colors.borderColor};  
            font-size: 2.4em;
            border-radius: 5px;  
            transition:all ${`linear`} 0.2s;
          }

          .iuUploadImage:hover .iuInner {
            border-color: ${theme.colors.textColor};
          }

          .iuInner :global(svg *){
            fill: ${theme.colors.lightText};
          }

          .iuUploadImage:hover :global(svg *){
            fill: ${theme.colors.textColor};
          }

          /* IMAGE CROPPER */
          .cropBox{
            display: ${`block`} !important;
            line-height: 27px;
          }

          .cropBox .box{
            display:flex;
            flex-direction: column;
            justify-content: space-between;
            width: 70%;
            max-width: 100%;
          }

          .cropPic{
            width: 100%;
            height: 400px;
            background: ${theme.colors.highlightColor};
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .cropPic img{
            max-width: 100%;
            max-height: 100%;
            display: block;
          }

          .cropBox .filled{
            margin-left: 10px;
          }

          .cropBox .options{
            display:flex;
            align-items:center;
            justify-content: space-between;
          }

          .cropBox .optionButtons{
            display:inline-flex;
            text-align: right;
            flex-grow: 1;
            align-items:center;
          }

          .cropBox .button{
            margin: 7px;
            width: auto !important;
          }

          @media screen ${`and`} (max-width: 800px ){
            .cropPic{
              height: 400px;
            }            
          }
        `}</style>
      </div>
    );
  }
}

export default ImageUpload;