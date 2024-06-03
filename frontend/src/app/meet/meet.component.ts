import { Component } from '@angular/core';


@Component({
  selector: 'app-meet',
  templateUrl: './meet.component.html',
  styleUrls: ['./meet.component.css']
})
export class MeetComponent {
  /*localVideo: any;
  remoteVideo: any;
  localStream: MediaStream | null;
  pc: RTCPeerConnection | null;
  audioEnabled: boolean;
  videoEnabled: boolean;
  conferenceStarted: boolean;
  message: string;
  messages: string[] = [];


  constructor(private webSocketService: WebSocketService) {
    this.message = '';

    this.localStream = null;
    this.pc = null;
    this.audioEnabled = true; // Microphone activé par défaut
    this.videoEnabled = true; // Caméra activée par défaut
    this.conferenceStarted = false;
  }

  ngOnInit(): void {
    this.localVideo = document.getElementById('localVideo');
    this.remoteVideo = document.getElementById('remoteVideo');


  
  }

 
  async startConference() {
    try {
        this.localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        this.localVideo.srcObject = this.localStream;

        // Initialize Peer-to-Peer connection
        this.initPeerConnection();

        // Modifier l'état de la conférence
        this.conferenceStarted = true;
    } catch (error) {
        console.error('Error starting conference:', error);
    }
}


  async stopConference() {
    if (this.localStream) {
        this.localStream.getTracks().forEach(track => track.stop());
        this.localStream = null;
    }

    if (this.pc) {
        this.pc.close();
        this.pc = null;
    }

    this.localVideo.srcObject = null;
    this.remoteVideo.srcObject = null;

    // Mettre à jour l'état de la conférence
    this.conferenceStarted = false;
}


  async shareScreen() {
    try {
      const screenStream = await navigator.mediaDevices.getDisplayMedia({ video: true });
      screenStream.getTracks().forEach(track => this.pc!.addTrack(track, screenStream));
    } catch (error) {
      console.error('Error sharing screen:', error);
    }
  }

 /* initPeerConnection() {
    this.pc = new RTCPeerConnection();
    this.pc.ontrack = (event) => {
        if (event.track.kind === 'video') {
            this.remoteVideo.srcObject = event.streams[0];
        }
    };
  }

  async initPeerConnection() {
    this.pc = new RTCPeerConnection();
    this.pc.onicecandidate = (event) => {
        if (event.candidate) {
            // Échangez les candidats ICE avec l'autre utilisateur
        }
    };
    this.pc.ontrack = (event) => {
        if (event.track.kind === 'video') {
            this.remoteVideo.srcObject = event.streams[0];
        }
    };
  }

  async toggleAudio() {
    this.audioEnabled = !this.audioEnabled;
    if (this.localStream) {
        const audioTrack = this.localStream.getAudioTracks()[0];
        if (audioTrack) {
            audioTrack.enabled = this.audioEnabled;
        }
    }
  }

  async toggleVideo() {
    this.videoEnabled = !this.videoEnabled;
    if (this.localStream) {
        const videoTrack = this.localStream.getVideoTracks()[0];
        if (videoTrack) {
            videoTrack.enabled = this.videoEnabled;
        }
    }
  }*/

 
    isOpen: boolean = true;
    name: string = '';
  
    ngOnInit(): void {
      const userInfoString = localStorage.getItem("userInfo");
      if (userInfoString) {
        try {
          const userInfo = JSON.parse(userInfoString);
          if (userInfo && userInfo.name) {
            this.name = userInfo.name;
          }
        } catch (error) {
          console.error("Error parsing user information:", error);
        }
      }
    }
  
    toggleChat(): void {
      this.isOpen = !this.isOpen;
    }
  
    encodeName(name: string): string {
      return encodeURIComponent(name);
    }



 
}
